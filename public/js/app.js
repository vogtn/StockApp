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

var data = d3.csvParseRows($("#data").text())
if(data.length > 1){

}


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