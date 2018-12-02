var treeData=
  {
    "name": "应用场景",
    "children": [
      {
        "name": "媒体娱乐",
        "children": [
          { "name": "品牌形象管理" },
          { "name": "交叉销售/追加销售" },
        ]
      },
      {
        "name": "广告收入",
        "children": [
          { "name": "精准广告投放" },
        ]
      },
      {
        "name": "内容习得与生产",
        "children": [
          { "name": "个性化差异化内容推荐" },
          { "name": "投放时间/地区优化" },
          { "name": "增加内容的利润率" },
          { "name": "渠道分析增强内容可获得性" },
          { "name": "用户分类/兴趣探索" }
        ]
      },
      {
        "name": "内容建档",
        "children": [
          { "name": "增加用户粘性" },
          { "name": "新旧内容更新" },
        ]
      },
      {
        "name": "娱乐场所管理（游乐场等）",
        "children": [
          { "name": "优化座位匹配" },
          { "name": "交叉销售/追加销售" },
          { "name": "优化设施和人员配置" }

        ]
      }
    ]
  };
  var treeData2=
    {"name": "人民网",
     "children": [
        {"name": "舆情监测"},
        {"name": "声誉管理"},
        {"name": "舆情培训"},
        {"name": "智库咨询"},
        {"name": "媒体融合应用解决方案",
         "children": [
            { "name": "新闻素材线索平台" },
            { "name": "新媒体聚合发布平台" },
            { "name": "全媒体大数据平台" },
            { "name": "新闻传播分析平台" },
            { "name": "用户数据分析平台" },
            { "name": "报业转型培训" }
          ]}
      ]
    };
  var margin = {top: 20, right: 90, bottom: 30, left:10},
    width = 630 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
function drawtree(divname,treedata) {
  var svg = d3.select(divname).append("svg")
              .attr("width", width + margin.right + margin.left)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(80," + margin.top + ")");
  var i = 0,duration = 750,root;
  var treemap = d3.tree().size([height, width]);
  root = d3.hierarchy(treedata, function(d) {return d.children;});
  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(collapse);
  update(root);


  function collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  function update(source) {
    var treedata = treemap(root);
    var nodes = treedata.descendants(),
        links = treedata.descendants().slice(1);
    nodes.forEach(function(d){ d.y = d.depth * 180});

    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {
          console.log(d,i);
          return d.id || (d.id =++i); });

    var nodeEnter = node.enter().append('g')
                        .attr('class', 'node')
                        .attr("transform", function(d) {
                          return "translate(" + source.y0 + "," + source.x0 + ")";
                      })
                        .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "#ef4806" : "#fff";
        });

    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; });

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
       });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d) {
          return d._children ? "rgb(144, 139, 140)" : "#fff";
      })
      .attr('cursor', 'pointer');

  console.log(source.y,source.x);
    var nodeExit = node.exit().transition()
                      .duration(duration)
                      .attr("transform", function(d) {
                          return "translate(" + source.y + "," + source.x + ")";
                      })
                      .remove();

    nodeExit.select('circle')
            .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);


    var link = svg.selectAll('path.link')
                  .data(links, function(d) { return d.id; });

    var linkEnter = link.enter().insert('path', "g")
                        .attr("class", "link")
                        .attr('d', function(d){
                          var o = {x: source.x0, y: source.y0}
                          return diagonal(o, o)
                        });

    var linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
              .duration(duration)
              .attr('d', function(d){ return diagonal(d, d.parent) });

    var linkExit = link.exit().transition()
                        .duration(duration)
                        .attr('d', function(d) {
                          var o = {x: source.x, y: source.y}
                          return diagonal(o, o)
                        })
                        .remove();
  nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path
    }

    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
      console.log(node);
      $(".node").on("click",function (e,i) {
        var ancestors=[];
        var parent=e;
        while (parent) {
                     ancestors.push(parent);
                      parent = parent.parent;}
        console.log(ancestors);
      })
    }
  }
}
