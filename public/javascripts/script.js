document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var theCountryArray = [];
google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': theMapApiKey
});

google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Popularity'],
    ['Russia', 200000],
    ['Italy', 30000],
    ['United States', 1000000],
    ['Iceland', 200],
    ['India', 850000]
  ]);

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}


$('.countryLink').on('click', () => {
  let theArray = $('.countyLink');
  theCountryArray = theArray;
    console.log("------------------------ ", theArray);
});
