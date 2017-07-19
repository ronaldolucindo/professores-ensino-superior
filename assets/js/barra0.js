$(function(){
  var margin = {top: 20, right: 30, bottom: 40, left: 30},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svg = d3.select("#faixa-pub").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          if (d.sexo == "F")
              return "<div style='text-align: center'><strong>" + d.idade + " anos</strong><br/>" + d.total + " mulheres";
          else
            return "<div style='text-align: center'><strong>" + d.idade + " anos</strong><br/>" + (-d.total) + " homens";
      })
      svg.call(tip);

d3.csv("data/faixa-etaria-publico.csv", type, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.total; })).nice();
  y.domain([20,90]);//d3.extent(data, function(d) { return d.idade; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.total < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.total)); })
      .attr("y", function(d) { return y(d.idade); })
      .attr("width", function(d) { return Math.abs(x(d.total) - x(0)); })
      .attr("height", 5)
      .attr("data-legend",function(d) { return d.sexo; })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);

svg.append("g")
    .attr("class","legenda-g2")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)
});

function type(d) {
  d.total = +d.total;
  d.idade = +d.idade;
  return d;
}

});