const request = require('request');

var geocodeAddress = (address, callback) => {
  var encoded_address = encodeURIComponent(address);

  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encoded_address,
    json: true
  }, (error, response, body)=>{
    if(error){
      callback("Error: Could not complete HTTP request to Google API.");
    } else if(body.status === 'ZERO_RESULTS'){
      callback("Address does not exist!");
    } else if(body.status === 'OK'){
      callback(undefined, {
        address : body.results[0].formatted_address,
        lat : body.results[0].geometry.location.lat,
        lng : body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
