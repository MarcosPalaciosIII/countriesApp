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
  var data = google.visualization.arrayToDataTable(
    countryList
  );

  var options = {
    region: 'world', // Africa
    // displayMode: 'text',
    colorAxis: {minValue: 1000000, maxValue: 500000000, colors: ['#00853f', 'lime', 'yellow', 'orange', '#e31b23']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: 'darkgray',
    defaultColor: '#f5f5f5',

  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div', 'geochart-colors'));

  chart.draw(data, options);
}


$('.countryLink').on('click', () => {
  let theArray = $('.countryLink');
  theCountryArray = theArray;
    console.log("------------------------ ", theArray);
});
