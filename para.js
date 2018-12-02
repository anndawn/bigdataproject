var das=[
{cate:"微博",name:'博客',value:13,chin:"13万"},
{cate:"微博",name:'视频',value:32,chin:"32万"},
{cate:"微博",name:'照片',value:16000,chin:"1.6亿"},
{cate:"Facebook",name:'照片',value:35000,chin:"3.5亿"},
{cate:"Facebook",name:'状态',value:53200,chin:"5.3亿"},
{cate:"Facebook",name:'消息',value:21600,chin:"2.2亿"},
{cate:"Facebook",name:'分享',value:187200,chin:"18.7亿"},
{cate:"Facebook",name:'喜欢',value:460000,chin:"46亿"},
{cate:"Twitter",name:'状态',value:50000,chin:"5亿"},
{cate:"Twitter",name:'喜欢',value:300000,chin:"30亿"},
{cate:"微信",name:'红包',value:50000,chin:"5亿"},
{cate:"微信",name:'照片',value:100000,chin:"10亿"},
{cate:"微信",name:'视频',value:200000,chin:"20亿"},
]
var cates=[];
var names=[];
var values=[];
var chins=[];
// var valuechin=['13万',]
for (var i = 0; i < das.length; i++) {
    cates.push(das[i].cate)
}
for (var i = 0; i < das.length; i++) {
    names.push(das[i].name)
}
for (var i = 0; i < das.length; i++) {
    values.push(das[i].value)
}
for (var i = 0; i < das.length; i++) {
    chins.push(das[i].chin)
}
console.log(cates,names,values);

var margin={"top":10,"right":10,"bottom":10,"left":50}
var svgheight2=$("#box5").height();
var svgwidth2=$("#box5").width();
var xwidth2=svgwidth2-margin.left-margin.right-100;
var yheight2=svgheight2-margin.top-margin.bottom-30;
console.log(xwidth2,yheight2);
var colorscale=d3.scaleOrdinal()
                 .domain(['博客','视频','照片','状态','消息','分享','红包','喜欢'])
                 .range(["#17f3c0","#7cf762","#fa88b5","#c96fd2","#7fb6d6","#e69146","#f33636","#1607ec"])
var yscale=d3.scaleLog()
              .domain([10,500000])
              .range([yheight2,0])
var xscale=d3.scaleBand()
             .domain(cates)
             .range([0,xwidth2])
var yAxis=d3.axisLeft()
            .scale(yscale)
            .tickFormat(function (d) {
        return yscale.tickFormat(10,d3.format(",d"))(d)
})
var xAxis=d3.axisBottom()
            .scale(xscale)
var svf2=d3.select("#box5")
          .append("svg")
          .attr("width",svgwidth2)
          .attr("height",svgheight2)
var mboard2=svf2.append("g")
              .attr("transform","translate("+margin.left+","+margin.top+")")
              .attr("width",xwidth2)
              .attr("height",yheight2)
              .style("background-color","rgba(111, 241, 79, 0.7)")
      mboard2.append("g")
            .style("font", "14px times")
            .classed('xaxis',true)
            .attr("transform","translate(60,"+yheight2+")")
            .call(xAxis)
      mboard2.append("g")
             .style("font", "14px times")
             .append("text")
             .text("发布量")
             .attr("fill","white")
             .attr("x",10)
             .attr("y",2)
         mboard2.append("g")
                .style("font", "14px times")
                .append("text")
                .text('发布平台')
                .attr("fill","white")
                .attr("x",270)
                .attr("y",yheight2-10)
      mboard2.append("g")
            .classed('yaxis',true)
            .attr("transform","translate(60,0)")
            .call(yAxis)


var zoomgen=d3.zoom()
        .on("zoom",function(d){
            var transx=d3.event.transform.x
            var transy=d3.event.transform.y
            var transk=d3.event.transform.k
            console.log(transx,transy,transk);
            d3.select(this).attr("transform","translate("+transx+","+transy+") scale("+transk+")")
        })

    var dots=mboard2.append("g")
                  .attr("transform","translate(60,0)")
                  .selectAll("circle")
                  .data(values)
                  .enter()
                  .append("circle")
                  .attr("cx",0)
                  .attr("cy",yheight2)
                  .attr("r",5)
                  .attr("fill","rgba(238, 241, 25, 0.3)")
                  .transition()  // Gives the fly out from the center effect
                  .delay(function (d, i){
                      return i * 100;  // Gives a slight delay with 100 ms spacing
                  })
                  .duration(1000)
                  .ease(d3.easeElastic)
                  .attr("fill",function (d,i) {
                      return colorscale(names[i]);
                  })
                  .attr("cx",function (d,i) {
                    return xscale(cates[i])+1/2*xscale.bandwidth()
                  })
                  .attr("cy",function (d) {
                      return yscale(d)
                  })
                  .attr("r",7)
                  .attr("data-legend",function(d) { return d.name})

 mboard2.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(-40,15)");
var legendOrdinal = d3.legendColor()
                      .shape("path", d3.symbol().type(d3.symbolSquare).size(80)())
                      .shapePadding(5)
                      .scale(colorscale);
    mboard2.select(".legendOrdinal")
          .style("font", "12px times")
          .attr("fill","white")
          .call(legendOrdinal);

var text2= mboard2.append("g")
               .attr("transform","translate(82,3)")
               .selectAll("text")
               .data(chins)
               .enter()
               .append("text")
               .attr("x",0)
               .attr("y",yheight2)
               .text(function (d) {
                   return d;
               })
               .attr("fill","white")
               .style("font-size","5px")
               .style("color",'rgba(0,0,0,0)')
               .transition()
               .duration(1000)
               .attr("x",function (d,i) {
                   return xscale(cates[i]);
               })
               .attr("y",function (d,i) {
                   return yscale(values[i]);
               })
               .style("color","rgba(128, 224, 150, 0.77)")
               // .attr("transform","translate(50,5)")
               mboard2.selectAll("text").call(zoomgen)
