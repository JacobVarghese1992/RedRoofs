var fs = require('fs');

var csv = require('fast-csv');

var index = 0;
fs.createReadStream('crime.csv')
  .pipe(csv())
  .on('data', function(data) {
   index = index + 1;
   if(index > 11) {
     return;
   }
   if(data[13] == "") {
     console.log("No Data");
   }
   console.log(data[13]);
  })
  .on('end', function(data){
   console.log('Read finished');
  });
