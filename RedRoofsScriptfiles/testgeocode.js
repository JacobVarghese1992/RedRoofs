var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyA9mH4J_k2jjjGxtEHbSIebANgaxKHcMSs', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
j = 1;
// Using callback
geocoder.geocode('29 champs elysée paris', function(err, res) {
  console.log(res);
  j = 0;
});

// while(j == 1) {

// }

console.log("Hi");
// // Or using Promise
// geocoder.geocode('29 champs elysée paris')
//   .then(function(res) {
//     console.log(res);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// output :
// [{
//   latitude: 48.8698679,
//   longitude: 2.3072976,
//   country: 'France',
//   countryCode: 'FR',
//   city: 'Paris',
//   zipcode: '75008',
//   streetName: 'Champs-Élysées',
//   streetNumber: '29',
//   administrativeLevels: {
//     level1long: 'Île-de-France',
//     level1short: 'IDF',
//     level2long: 'Paris',
//     level2short: '75'
//   },
//   provider: 'google'
// }]