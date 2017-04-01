var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var mysql = require('mysql');

var connection =  mysql.createPool({
	host : 'redroofs.clmzagnk9vbp.us-east-1.rds.amazonaws.com',
	user : 'redroofs',
	password: 'redroofs',
	port     : '3306',
	database: 'redroofs'
});

app.use(cors());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
// var authCheck = jwt({
//   secret: new Buffer('YOUR_AUTH0_SECRET', 'base64'),
//   audience: 'YOUR_AUTH0_CLIENT_ID'
// });

var users = [
  { id: 1, name: 'Todd Motto', image: 'image-1.jpg' },
  { id: 2, name: 'Brad Green', image: 'image-2.jpg' },
  { id: 3, name: 'Igor Minar', image: 'image-3.jpg' }
];

app.get('/api/users', function(req, res) {
  res.json(users);
});

app.get('/listings/:state/:city', function(req, res) {
  	// res.json(users);
  	console.log(req.params.state)
  	console.log(req.params.city)

	// var query = 'INSERT INTO Listings(listing_id,address,beds,baths,price,currency,safety_rating,link,longitude,latitude,Agent_id) VALUE(?,?,?,?,?,?,?,?,?,?,?)';
    var query = "SELECT L.listing_id,L.address,L.image,L.beds,L.baths,L.price,C.symbol AS " +
			  "currency,L.safety_rating,L.link,R.description AS Agent FROM Listings AS L "+
			  "INNER JOIN Currencies AS C "+
			  "ON L.currency = C.currency "+
              "INNER JOIN RealEstateAgents AS R "+
              "ON L.Agent_id = R.agent_id "+
              "WHERE L.state= ? AND L.city= ?";
  	var table = [req.params.state,req.params.city];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});

app.get('/allstates', function(req, res) {

    var query = "SELECT DISTINCT state FROM StateCity";
  	var table = [];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});

app.get('/allcities', function(req, res) {

    var query = "SELECT DISTINCT city FROM StateCity";
  	var table = [];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});

app.listen(4000);
console.log('Listening on http://localhost:4000');