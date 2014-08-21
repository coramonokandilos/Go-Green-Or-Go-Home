google.load("visualization", '1', {packages:['corechart']});
google.setOnLoadCallback(drawAllCharts);

function drawWaterChart() {
    var query = new google.visualization.Query(
        'https://docs.google.com/a/hnhsoakland.org/spreadsheets/d/1Hfhwq43upkEMGmf5hz_WRBuSAE3hIBsXVW5MXotlU9k/edit#gid=544676268');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    query.setQuery('select A, B where B > 0');

    query.send(handleQueryResponseWater);
}

function drawCO2Chart() {

    console.log("drawing gas chart");
    var query = new google.visualization.Query(
        'https://docs.google.com/a/girlswhocode.com/spreadsheets/d/10pTMVMy6hQ6vtgcvyBLI6HhNVddXBvdALjnLzUH1LAk/edit#gid=0');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    query.setQuery('select A, C where C > 0');

    query.send(handleQueryResponseGas);
    //drawChart('gasChart', query)
}

function drawElectricChart() {
    var query = new google.visualization.Query(
        'https://docs.google.com/a/girlswhocode.com/spreadsheets/d/10pTMVMy6hQ6vtgcvyBLI6HhNVddXBvdALjnLzUH1LAk/edit#gid=0');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    query.setQuery('select A, D where D > 0');

    query.send(handleQueryResponseElectric);
}

function handleQueryResponseWater(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    var chart = new google.visualization.BarChart(document.getElementById('waterChart'));
    chart.draw(data, { legend: { position: 'right' } });
}

function handleQueryResponseGas(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    var chart = new google.visualization.BarChart(document.getElementById('gasChart'));
    chart.draw(data, { legend: { position: 'right' } });
}

function handleQueryResponseElectric(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    var chart = new google.visualization.BarChart(document.getElementById('electricChart'));
    chart.draw(data, { legend: { position: 'right' } });
}
/**
 * Created by coramonokandilos on 7/22/14.
 */

function drawAllCharts(){
    drawWaterChart();
    drawElectricChart();
    drawCO2Chart();
}