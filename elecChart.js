/**
 * Created by coramonokandilos on 7/25/14.
 */
/**
 * Created by coramonokandilos on 7/25/14.
 */
/**
 * Created by coramonokandilos on 7/25/14.
 */
google.load("visualization", '1', {packages:['corechart']});
google.setOnLoadCallback(drawAllCharts);

function drawWaterChart() {
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1Hfhwq43upkEMGmf5hz_WRBuSAE3hIBsXVW5MXotlU9k/edit#gid=544676268');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    //query.setQuery('select A, B where B > 0');

    query.send(handleQueryResponseWater);
}

function drawCO2Chart() {

    console.log("drawing gas chart");
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1mp33RvDj6dpNiXPbjsXf8u-UQ1gCjznbXvLNIybcjGs/edit#gid=580084903');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    //query.setQuery('select A, C where C > 0');

    query.send(handleQueryResponseGas);
    //drawChart('gasChart', query)
}

function drawElectricChart() {
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1l4NlgC-2B87zyuPfbGYf6Q8W6nt-E8x3EQL7RDxM7eg/edit#gid=34799961');
    //only show the water stats - if you comment out the line it will show all of the results
    //reference https://developers.google.com/chart/interactive/docs/querylanguage and
    //https://code.google.com/apis/ajax/playground/?type=visualization#using_the_query_language for how to query
    //query.setQuery('select A, D where D > 0');
    query.send(handleQueryResponseElectric);
}

function handleQueryResponseWater(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();

//    //do math for last row
    var lastRow = data.getNumberOfRows();



    console.log(lastRow);
    lastRow = lastRow-1;

    data.setValue(lastRow, 4, (data.getValue(lastRow, 1) * 2.5) + (data.getValue(lastRow, 2) * 1.6)  + (data.getValue(lastRow, 3) * 2));

    console.log(data.getValue(0,0));
    console.log(data.getValue(1,0));

    data.insertColumn(0,"string");

    data.setValue(0, 0, "National Average");
    data.setValue(lastRow, 0, "You");

    data.removeColumns(1,4);
    data.removeRows(1, lastRow-1);

    var chart = new google.visualization.BarChart(document.getElementById('gasChart'));
    chart.draw(data, { legend: { position: 'right' } });
}

function handleQueryResponseGas(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();

    //do math for last row
    var lastRow = data.getNumberOfRows();
    console.log(lastRow);
    lastRow = lastRow-1;

    data.setValue(lastRow, 3, (data.getValue(lastRow, 1)/data.getValue(lastRow, 2))*19.64);
    console.log(data.getValue(0,0));


    data.insertColumn(0,"string");

    data.setValue(0,0, "National Average");
    data.setValue(lastRow,0, "You");


    data.removeColumns(1,3);
    data.removeRows(1, lastRow-1);
    var chart = new google.visualization.BarChart(document.getElementById('gasChart'));
    chart.draw(data, { legend: { position: 'right' } });
}

function handleQueryResponseElectric(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();

    var lastRow = data.getNumberOfRows();
    console.log(lastRow);
    lastRow = lastRow-1;

    console.log(data.getValue(lastRow, 1));

    data.insertColumn(0,"string");

    data.setValue(0,0, "National Average");
    data.setValue(lastRow, 0, "You");

    data.removeColumns(1,1);
    data.removeRows(1, lastRow-1);

    var chart = new google.visualization.BarChart(document.getElementById('electricChart'));
    chart.draw(data, { 'height': 400, 'width': 800,legend: { position: 'right' } });
}
/**
 * Created by coramonokandilos on 7/22/14.
 */

function drawAllCharts(){
    //drawWaterChart();
    drawElectricChart();
    //drawCO2Chart();
}