var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var syncrequest = require('sync-request');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');

var app = express();
var html;


allamenities = [];
latlongs = [];
names = [];
console.log("Fetching listings .....");


var binPath = phantomjs.path;
var childArgs = [
    path.join(__dirname, 'phantomjs-script.js'), 'http://www.livecampusapts.com/Apartments/module/properties/'
];

var html_full;
html_file = childProcess.execFileSync(binPath, childArgs);
var html = html_file.toString();
var $ = cheerio.load(html);
var j = 0;
$('li.result-item').each(function() {
    var url = $(this).find('a.js-property-details').attr('href');
    var address = $(this).find('a.prop-address').text().trim();
    var bed_bath = $(this).find('p.description').text();
    var rent = $(this).find('strong.stat-val').last().text().replace("from $", "");
    //var img = "http://www.livecampusapts.com" + $(this).find('img.prop-img').attr('src');
    var bedbaths = [];
    if (bed_bath.includes('Unit')) {
        bedbaths = get_bed_bath(bed_bath);
        for (bb of bedbaths) {
            var bed
            // console.log(bb)
            var row = {
                'url': url,
                'address': address,
                'bed': parseInt(bb.split("/")[0]),
                'bath': parseInt(bb.split("/")[1]),
                'rent': parseFloat(rent),
                //'image': img,
                'amenities': [],
                'latitude': "",
                'longitude': "",
                "safety_rating": "",
                "agency":"CAPT"
            }

            if (isNaN(row.bed))
                return;

            if (isNaN(row.bath))
                return;

            if (isNaN(row.rent))
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
for (var i = 0; i < names.length; i++) {
    var amenities = [];
    var childArgs = [
        path.join(__dirname, 'phantomjs-script.js'), names[i].url
    ];

    var html_file = childProcess.execFileSync(binPath, childArgs);
    var html = html_file.toString();
    var $ = cheerio.load(html);
    $('span.amenity-name').each(function() {
        var amt = get_amenities_code($(this).text());
        if (amt != 'XXXX') {
            amenities.push(amt);
            allamenities.push($(this).text());
        }

    });
    var img = $('div.galleria-image').find('img').attr('src');
    // console.log(img)
    names[i].image = img
    names[i].amenities = amenities;
    console.log("Fetched " + (i + 1) + " amenities. Please wait for " + names.length);
};


////////////////////////////////////////////Listings 2

console.log("Fetching listings 2.....");

for (var i = 1; i < 5; i++) {
    var source_url = 'https://www.apartments.com/philadelphia-pa/' + i + '/';
    var childArgs = [
        path.join(__dirname, 'phantomjs-script.js'), source_url
    ];

    var html_full;
    html_file = childProcess.execFileSync(binPath, childArgs);
    var html = html_file.toString();
    var $ = cheerio.load(html);

    var count = 0;
    $('div.placardContainer').children().each(function() {
        count ++;
        var url = $(this).find('a.placardTitle').attr('href');
        if (url == null || url == '') {
            console.log(url)
            return
        }
        var address = $(this).find('div.location').text().trim();
        var bed = get_bed($(this).find('span.unitLabel').text());
        var rent = $(this).find('span.altRentDisplay').last().text().replace("$", "").split(" - ");
        for (var i = 0; i < rent.length; i++){
            rent[i] = parseInt(rent[i].replace(",", ""));            
        }

        var amenities = [];
        $(this).find('ul.amenities').children().each(function() {
            temp = get_amenities_code($(this).attr('title'))
            if (temp != 'XXXX') {
                amenities.push(temp);
            }
        });
        if (amenities.length == 0) {
            amenities.push('OPA');
        }
        var img = $(this).find('div.item').attr('data-image');

        // if(count <= 1) {

        // }
        if(img == "") {
            var img = $(this).find('div.item').attr('style').replace("background-image: url(", "").replace(");", "");        
        }
        // console.log(img);
        var min = 0;
        if (rent.length < bed.length)
            min = rent.length
        else
            min = bed.length
        for (var i = 0; i < min; i++) {
            if (isNaN(bed[i]))
                continue;
            if (isNaN(rent[i]))
                continue;
            names.push({
                'url': url,
                'address': address,
                'bed': bed[i],
                'bath': bed[i],
                'rent': rent[i],
                'image': img,
                'amenities': amenities,
                'latitude': "",
                'longitude': "",
                'agency': "APT"
            });
        }

    });
}
console.log();
console.log(names);
console.log("Total listings after 2 fetched = " + names.length);

////////////////////////////////////////////Listings 2

console.log();
console.log("Fetching latitude and logitude. Please wait ... ");
console.log();

var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var url2 = "&key=AIzaSyA9mH4J_k2jjjGxtEHbSIebANgaxKHcMSs";
var names_tmp = [];
for (var i = 0; i < names.length; i++) {
    var res = syncrequest('GET', url1 + names[i].address + url2);
    if (JSON.parse(res.getBody('utf8'))['results'][0] == null) {

    } else {
        names[i].latitude = JSON.parse(res.getBody('utf8'))['results'][0]['geometry']['location']['lat'];
        names[i].longitude = JSON.parse(res.getBody('utf8'))['results'][0]['geometry']['location']['lng'];
        names[i].address = JSON.parse(res.getBody('utf8'))['results'][0]["formatted_address"];
        var rowlatlon = {
            'latitude': names[i].latitude,
            'longitude': names[i].longitude
        };
        latlongs.push(rowlatlon);
        names_tmp.push(names[i]);
    }

};

names = names_tmp;



var allamenities = allamenities.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})



var lls = latlongs;
latlongs = lls.filter(function(item, pos) {
    return lls.indexOf(item) == pos;
})


var allCrimeData = [];
var smallest = 99999999999999;
var largest = 0;




var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
// Connection URL
var url = "mongodb://redroofs:redroofs@redroofs-shard-00-00-2lh9v.mongodb.net:27017,redroofs-shard-00-01-2lh9v.mongodb.net:27017,redroofs-shard-00-02-2lh9v.mongodb.net:27017/redroofsdb?ssl=true&replicaSet=redroofs-shard-0&authSource=admin"
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    getAllCrimes(db, function() {
        db.close();
    });
});




var getsafetyrating = function() {
    for (var i = 0; i < names.length; i++) {
        var sum = 0;
        for (var j = 0; j < allCrimeData.length; j++) {
            var distance = calcCrow(parseFloat(allCrimeData[j].longitude), parseFloat(allCrimeData[j].latitude), parseFloat(names[i].latitude), parseFloat(names[i].longitude));
            sum = sum + allCrimeData[j].crime_ucr / (distance * distance);
        }
        names[i].safety_rating = Math.floor(sum);

        if (smallest > names[i].safety_rating)
            smallest = names[i].safety_rating;

        if (largest < names[i].safety_rating)
            largest = names[i].safety_rating;

        console.log("safety_rating of " + i);



    }
    updatelistingsDB();
}


function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

function updatelistingsDB() {
    var mysql = require('mysql');

    var pool = mysql.createPool({
        host: 'redroofs.clmzagnk9vbp.us-east-1.rds.amazonaws.com',
        user: 'redroofs',
        password: 'redroofs',
        port: '3306',
        database: 'redroofs'
    });

    var insertListing = 'INSERT INTO Listings(listing_id,address,image,beds,baths,price,currency,safety_rating,link,latitude,longitude,Agent_id) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)';
    var deleteAllListings = 'DELETE FROM Listings';
    var deleteAmenitiesListing = 'DELETE FROM IncludedAmenities';
    var insertAmenitiesListing = 'INSERT INTO IncludedAmenities(listing_id,amenity_id) VALUE(?,?)';
    pool.getConnection(function(err, connection) {
        connection.query(deleteAmenitiesListing, function(err, rows) {
            if (err) throw err;
            else {
                console.log("All IncludedAmenities Deleted");
            }
        });

        //Read table.
        connection.query(deleteAllListings, function(err, rows) {
            if (err) throw err;
            else {
                console.log("All Listings Deleted");
            }
        });



        for (var i = 0; i < names.length; i++) {
            //Insert a record.
            var safety = Math.ceil(((names[i].safety_rating - smallest) / (largest - smallest)) * 5)
            connection.query(insertListing, [i, names[i].address, names[i].image, names[i].bed, names[i].bath, names[i].rent, "USD", safety, names[i].url, names[i].latitude, names[i].longitude, names[i].agency], function(err, res) {
                if (err) throw err;
                else {
                    console.log('Listing ' + i + ' has been inserted');
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
                connection.query(insertAmenitiesListing, [i, names[i].amenities[j]], function(err, res) {
                    if (err) throw err;
                    else {
                        console.log('amenity ' + j + ' has been inserted of listing ' + i);
                    }
                });
            }
        }

        // connection.release();//release the connection

    });
}


function get_amenities_code(amenities) {
    switch (amenities) {
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
            return 'DOGS'
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
        case 'Washer Dryer':
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

};

function get_bed_bath(bedbath) {
    answers = [];
    bedbath = bedbath.substring(bedbath.indexOf(":") + 2, bedbath.length);
    bedbaths = bedbath.split(",");
    for (bb of bedbaths) {
        // console.log(bb);
        if (!bb.includes("Studio")) {
            answers.push(bb.replace("Bedroom", "").replace(/Bathroom.*\)/, ""));
        }
    }

    return answers;
}

var getAllCrimes = function(db, callback) {

    collection = db.collection('crimeStats');
    collection.find({}).toArray(function(err, results) {
        allCrimeData = results;
        getsafetyrating();
        // console.log(allCrimeData); // output all records
    });

}

function get_bed(s) {
    if (s == null)
        return
    temp = s.split(" - ")
    if (temp.length < 2)
        temp = s.split("-")
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "Studio" || temp[i] == "Studio ") {
            temp[i] = 1;
        } else {
            temp[i] = parseInt(temp[i].split(" ")[0])
        }
    }
    return temp
}
