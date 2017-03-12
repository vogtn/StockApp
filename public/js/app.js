$( document ).ready(function() {
    $("#gopher").animate({bottom: "0"});
    $("#gopher").animate({height: "80vh"}, 2000);
    $(".char1").hide().fadeIn(6000);
    $(".char2").hide().fadeIn(6000);
    $(".char3").hide().fadeIn(6000);
    $(".char4").hide().fadeIn(6000);
    $(".char5").hide().fadeIn(6000);
    $(".char6").hide().fadeIn(6000);
    $(".char7").hide().fadeIn(6000);

var data = $("#data").text()
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");





    //d3 table
    var parsedCSV = d3.csvParseRows($("#data").text());
    var container = d3.select("body")
        .append("table")
        .selectAll("tr")
            .data(parsedCSV).enter()
            .append("tr")
        .selectAll("td")
            .data(function(d) { return d; }).enter()
            .append("td")
            .text(function(d) { return d; });
});