const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a : {
      demand: true,
      alias: 'address',
      describe: 'Address for which to fetch weather.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      } else{
        console.log('Current Temperature: ' + JSON.stringify(weatherResults.temperature, undefined, 2));
        console.log('Apparent Temperature: ' + JSON.stringify(weatherResults.apparentTemperature, undefined, 2));
      }
    });
  }
});
