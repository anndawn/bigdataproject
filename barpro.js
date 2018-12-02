var datax=[172,40,30,165,120,50];
var datay=['Facebook','Twitter','Youtube','微博','今日头条','快手'];
    var margin={"top":20,"right":50,"bottom":50,"left":50}
    var svgheight=$("#char1").height();
    var svgwidth=$("#char1").width();
    var xwidth=svgwidth-margin.left-margin.right;
    var yheight=svgheight-margin.top-margin.bottom;
    // x轴比例尺
    var xscale=d3.scaleLinear()
                  .domain([0,200])
                  .range([0,xwidth])
    // y轴比例尺
    var yscale=d3.scaleBand()
                 .domain(datay)
                 .range([0,yheight])
                 .paddingInner(0.95)
                 .paddingOuter(0.6)
    var yAxis=d3.axisLeft()
                .scale(yscale)

    var xAxis=d3.axisBottom()
                .scale(xscale)
                .ticks(5)
    var svf=d3.select("#char1")
              .append("svg")
              .attr("width",svgwidth)
              .attr("height",svgheight)

    var mboard=svf.append("g")
                  .attr("transform","translate("+margin.left+","+margin.top+")")
                  .attr("width",xwidth)
                  .attr("height",yheight)
           mboard.append("g")
                 .classed('xaxis',true)
                 .attr("transform","translate(20,"+yheight+")")
                 .call(xAxis)
           mboard.append("g")
                 .style("font", "14px times")
                 .classed('yaxis',true)
                 .attr("transform","translate(20,0)")
                 .call(yAxis)
                 mboard.append("g")
                       .attr("transform","translate(0,-5)")
                        .style("font", "12px times")
                        .append("text")
                        .text("发布平台")
                        .attr("fill","white")
                        .attr("x",10)
                        .attr("y",0)
                mboard.append("g")
                       .style("font", "12px times")
                       .append("text")
                       .text('用户量')
                       .attr("fill","white")
                       .attr("x",210)
                       .attr("y",yheight-10)
               mboard.append("g")
                      .style("font", "10px times")
                      .append("text")
                      .text('万人')
                      .attr("fill","white")
                      .attr("x",228)
                      .attr("y",yheight+6)

    var rects=mboard.selectAll("rect")
                    .data(datax)

              rects.enter()
                    .append("rect")
                    .attr("x",20)
                    .attr("y",function (d,i) {
                        return yscale(datay[i])})
                    .attr("width",0)
                    .attr("height",yscale.bandwidth())
                    .attr("fill","#dfe88d")
                    .transition()
                    .duration(5*1000)
                    .attr("width",function (d) {
                        console.log(d);
                        return xscale(d)})

var dm=["img/fb.png","img/tw.png","img/yt.png","img/sina.png","img/tt.png","img/ks.png"]
mboard.selectAll("image")
      .data(dm)
      .enter()
      .append("image")
      .attr("x",-10)
      .attr("y",function (d,i) {
          return yscale(datay[i])+10
      })
      .attr("href",function (d,i) {
          return d
      })
      .attr("width",23)
      .attr("height",23)

      mboard.selectAll("circle")
                  .data(datax)
                  .enter()
                  .append('circle')
                  .attr("cx",20)
                  .attr("cy",function (d,i) {
                     return yscale(datay[i])+1.5
                  })
                  .attr("r",3)
                  .attr("fill","#e46c48")
                  .transition()
                  .duration(5*1000)
                  .attr("cx",function (d,i) {
                     return xscale(d)+20
                  })
 var tool_tip = d3.select("#char1").append("div")
                 .attr("class", "tooltip")
                 .style("opacity", 0);
mboard.selectAll("circle").on("mouseover", function (d) {
                      tool_tip.html(d)
                              .style("left", (d3.event.pageX-1065) + "px")
                              .style("top", (d3.event.pageY -106) + "px")
                      tool_tip.transition()
                              .duration(200)
                              .style("opacity",0.9)
                  })
                  .on("mouseout",function () {
                      tool_tip.transition()
                                .duration(500)
                                .style("opacity", 0);
                  });
