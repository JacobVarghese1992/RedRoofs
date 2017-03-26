var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var syncrequest = require('sync-request');
var app     = express();
var html;


allamenities = []
names=[];
console.log("Fetching listings .....");
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

function get_amenities_code(amenities) {
    switch(amenities) {
        case 'Online Payments Available':
            return 'OPA'
            break;
        case 'Complimentary Shuttle Service':
            return 'CSS'
            break;
        case '24 Hour Emergency Maintenance':
            return '24EM'
            break;
        case 'Prime Locations':
            return 'PL'
            break; 
        case 'Close to Campus':
            return 'C2C'
            break;
        case 'Updated Kitchens and Bathrooms in select units':
            return 'UKB'
            break;
        case 'Onsite laundry':
            return 'OL'
            break;      
        case 'Updated Kitchen & Bathrooms*':
            return 'UKB'
            break;
        case 'Updated Kitchens and Bathrooms*':
            return 'UKB'
            break;
        case 'Cable ready':
            return 'CARD'
            break;
        case 'Courtyard':
            return 'CTYD'
            break; 
        case 'Elevator':
            return 'EVTR'
            break;
        case 'Bike Room':
            return 'BKRM'
            break;
        case 'Hardwood Flooring & Carpeting':
            return 'HFC'
            break;
        case '24-Hour Emergency Maintenance':
            return '24EM'
            break;      
        case 'Off-street parking':
            return 'OFSP'
            break;
        case 'Dogs':
            return 'PETF'
            break;
        case 'Cats':
            return 'PETF'
            break;
        case 'Pet Friendly':
            return 'PETF'
            break;
        case 'Hardwood Flooring':
            return 'HWFL'
            break;
        case 'Fenced in Green Space':
            return 'FGS'
            break;
        case 'Air Conditioning':
            return 'AIRC'
            break;
        case 'Washer/Dryer':
            return 'WAD'
            break;
        case 'Dishwasher':
            return 'DIS'
            break;
        case 'Parking':
            return 'OFSP'
            break;
        case 'Fitness Center':
            return 'FITC'
            break;            
        default:
            'XXXX';
            break;
    }

}    
 
function get_bed_bath(bedbath) {
  answers = [];  
  bedbath = bedbath.substring(bedbath.indexOf(":") + 2, bedbath.length);
  bedbaths = bedbath.split(",");
  for(bb of bedbaths) {
    // console.log(bb);
    if(!bb.includes("Studio")) {
        answers.push(bb.replace("Bedroom","").replace(/Bathroom.*\)/,""));
    }
  }

  return answers;
} 
var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),'http://www.livecampusapts.com/Apartments/module/properties/'
];

var html_full;
html_file = childProcess.execFileSync(binPath, childArgs);
var html = html_file.toString();
var $ = cheerio.load(html);
var j = 0;
$('li.result-item').each(function(){
    var url=$(this).find('a.js-property-details').attr('href');
    var address=$(this).find('a.prop-address').text().trim();
    var bed_bath=$(this).find('p.description').text();
    var rent= $(this).find('strong.stat-val').last().text().replace("from $","");
    var img= "http://www.livecampusapts.com" + $(this).find('img.prop-img').attr('src');
    var bedbaths = [];
    if( bed_bath.includes('Unit')) {
        bedbaths = get_bed_bath(bed_bath);
        for(bb of bedbaths) {
            var bed
            // console.log(bb)
            var row = {'url':url, 'address':address,'bed':parseInt(bb.split("/")[0]),'bath':parseInt(bb.split("/")[1]),'rent':parseFloat(rent), 'image':img, 'amenities':[], 'latitude':"", 'longitude':"", agency:"CAPT"}

            if(isNaN(row.bed))
                return;
            
            if(isNaN(row.bath))
                return;

            if(isNaN(row.rent))
                return;

            names.push(row);  
    
        }
    }
        // j++;
        // if(j>1)
        //     return false;
});
console.log();
console.log("Total listings fetched = " + names.length);
console.log();
console.log("Fetching amenities .....");
for (var i=0;i<names.length;i++) {
  var amenities = [];
  var childArgs = [
    path.join(__dirname, 'phantomjs-script.js'),names[i].url
  ];

  var html_file = childProcess.execFileSync(binPath, childArgs);
  var html = html_file.toString();
  var $ = cheerio.load(html);
  $('span.amenity-name').each(function(){
    var amt = get_amenities_code($(this).text());
    if(amt != 'XXXX') {
        amenities.push(amt);
        allamenities.push($(this).text());        
    }

  });
  names[i].amenities=amenities;
  console.log("Fetched "+(i+1)+" amenities. Please wait for " + names.length);
};

/////////////////////////////////////////////////////////////////////////////////////////////////
console.log("Fetching listings 2.....");
function get_bed(s){
  if(s==null)
    return 
  temp=s.split(" - ")
  if (temp.length<2)
    temp=s.split("-")
  for (var i=0;i<temp.length;i++){
    if(temp[i]=="Studio" || temp[i]=="Studio "){
      temp[i]=1;
    }
    else {
      temp[i]=parseInt(temp[i].split(" ")[0])
    }
  }
  return temp
}
for(var i=1; i<3;i++){
  var source_url='https://www.apartments.com/philadelphia-pa/'+i+'/';
  var childArgs = [
    path.join(__dirname, 'phantomjs-script.js'),source_url
  ];

  var html_full;
  html_file = childProcess.execFileSync(binPath, childArgs);
  var html = html_file.toString();
  var $ = cheerio.load(html);

  $('div.placardContainer').children().each(function(){
      var url=$(this).find('a.placardTitle').attr('href');
      if(url==null || url==''){
        console.log(url)
        return
      }
      var address=$(this).find('div.location').text().trim();
      var bed=get_bed($(this).find('span.unitLabel').text());
      var bath=2;
      var rent= $(this).find('span.altRentDisplay').last().text().replace("$","").split(" - ");
      for(var i=0;i<rent.length;i++)
        rent[i]=parseInt(rent[i].replace(",",""))
      var amenities = [];
      $(this).find('ul.amenities').children().each(function(){
        temp=get_amenities_code($(this).attr('title'))
        if(temp!='XXXX'){
          amenities.push(temp);
        }
      });
      if(amenities.length==0){
        amenities.push('OPA');
      }
      
      var min=0;
      if(rent.length<bed.length)
        min=rent.length
      else
        min=bed.length
      for(var i=0;i<min;i++){
        if(isNaN(bed[i]))
          continue;    
        if(isNaN(rent[i]))
          continue;
        names.push({'url':url, 'address':address,'bed':bed[i],'bath':bath,'rent':rent[i], 'amenities':amenities, 'latitude':"", 'longitude':"",agency:"APT"}); 
      }
       
  });
}
console.log();
console.log(names);
console.log("Total listings after 2 fetched = " + names.length);
////////////////////////////////////////////////////////////////////////////

console.log();
console.log("Fetching latitude and logitude. Please wait ... ");
console.log();

var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var url2 = "&key=AIzaSyA9mH4J_k2jjjGxtEHbSIebANgaxKHcMSs";
for (var i=0;i<names.length;i++) {
    var res = syncrequest('GET', url1+names[i].address+url2);
    names[i].latitude = JSON.parse(res.getBody('utf8'))['results'][0]['geometry']['location']['lat'];
    names[i].longitude = JSON.parse(res.getBody('utf8'))['results'][0]['geometry']['location']['lng'];
    names[i].address = JSON.parse(res.getBody('utf8'))['results'][0]["formatted_address"];

}  



var allamenities = allamenities.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

// console.log(fruits_without_duplicates);

// console.log(names);  

  


var mysql = require('mysql');

var pool =  mysql.createPool({
host : 'redroofs.clmzagnk9vbp.us-east-1.rds.amazonaws.com',
user : 'redroofs',
password: 'redroofs',
port     : '3306',
database: 'redroofs'
});

var insertListing = 'INSERT INTO Listings(listing_id,address,image,beds,baths,price,currency,safety_rating,link,latitude,longitude,Agent_id) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)';
var deleteAllListings = 'DELETE FROM Listings';
var deleteAmenitiesListing = 'DELETE FROM IncludedAmenities';
var insertAmenitiesListing = 'INSERT INTO IncludedAmenities(listing_id,amenity_id) VALUE(?,?)';
pool.getConnection(function(err, connection){    
    connection.query(deleteAmenitiesListing, function(err, rows){
        if(err) throw err;
        else {
            console.log("All IncludedAmenities Deleted");
        }
    });    
    
      //Read table.
    connection.query(deleteAllListings, function(err, rows){
        if(err) throw err;
        else {
            console.log("All Listings Deleted");
        }
    });



    for (var i=0;i<names.length;i++) {
        //Insert a record.
        connection.query(insertListing,[i,names[i].address,names[i].image,names[i].bed,names[i].bath,names[i].rent,"USD",5,names[i].url,names[i].latitude,names[i].longitude,names[i].agency], function(err,res){
            if(err) throw err;
            else {
                console.log('Listing '+i+' has been inserted');
                // for (var j = 0; j < names[i].amenities.length; j++) {
                //     connection.query(insertAmenitiesListing,[i,names[i].amenities[j]], function(err,res){
                //         if(err) throw err;
                //         else {
                //             console.log('amenity '+j+' has been inserted of listing '+ i);
                //         }
                //     });            
                // }               
            }
        });


        for (var j = 0; j < names[i].amenities.length; j++) {
            connection.query(insertAmenitiesListing,[i,names[i].amenities[j]], function(err,res){
                if(err) throw err;
                else {
                    console.log('amenity '+j+' has been inserted of listing '+ i);
                }
            });            
        }
    }   

    // connection.release();//release the connection

});