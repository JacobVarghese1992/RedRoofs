var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http');
var parseString = require('xml2js').parseString;

var connection =  mysql.createPool({
	host : 'redroofs.clmzagnk9vbp.us-east-1.rds.amazonaws.com',
	user : 'redroofs',
	password: 'redroofs',
	port     : '3306',
	database: 'redroofs'
});


app.use(bodyParser.json())
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

app.get('/listings/:state/:city/:user_id/:price_range/:beds_range/:baths_range/:realtors/:amenities', function(req, res) {
  	// res.json(users);
  	console.log(req.params.state)
  	console.log(req.params.city)
    var sendmail1 = "\"<br><a href='mailto:\"";
    var sendmail2 = "\"'>Send Mail</a>";
    var call1 = "<br><a href='tel:\"";
    var call2 = "\"'>Call</a>\"";

    var price_range = JSON.parse(req.params.price_range);
    var beds_range = JSON.parse(req.params.beds_range);
    var baths_range = JSON.parse(req.params.baths_range);
    var amenities = JSON.parse(req.params.amenities);

    var query_amenity;
    if(amenities.length > 0) {
      query_amenity = " Amenity LIKE '%" + amenities[0] + "%' ";
      for(var i = 1; i < amenities.length ; i++) {
        query_amenity = query_amenity + " OR Amenity LIKE '%" + amenities[i] + "%' "
      }
    } else {
      query_amenity = " Amenity LIKE '%' "
    }

var query = "SELECT V.*, CONCAT(V.fav, '-', (F.listing_id IS NOT NULL)) AS isfav, F.user_id " + 
"FROM ViewListingsAmenities AS V " +
"LEFT OUTER JOIN Favourites AS F " +
"ON V.listing_id = F.listing_id " +
"WHERE V.state = ? AND V.city = ? " +
"AND price_sort >= ? AND price_sort <= ? " +
"AND beds >= ? AND beds <= ? " +
"AND baths >= ? AND baths <= ? " +
"AND Agent_id IN " + req.params.realtors + " " +
"AND ( " + query_amenity + " ) " +
" HAVING user_id IS NULL OR user_id = ? ";

  	var table = [req.params.state,req.params.city, price_range[0], price_range[1], beds_range[0], beds_range[1], baths_range[0], baths_range[1], req.params.user_id];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});


app.get('/favlistings/:state/:city/:user_id/:price_range/:beds_range/:baths_range/:realtors/:amenities', function(req, res) {
    // res.json(users);
    console.log(req.params.state)
    console.log(req.params.city)
    var sendmail1 = "\"<br><a href='mailto:\"";
    var sendmail2 = "\"'>Send Mail</a>";
    var call1 = "<br><a href='tel:\"";
    var call2 = "\"'>Call</a>\"";

    var price_range = JSON.parse(req.params.price_range);
    var beds_range = JSON.parse(req.params.beds_range);
    var baths_range = JSON.parse(req.params.baths_range);
    var amenities = JSON.parse(req.params.amenities);

    var query_amenity;
    if(amenities.length > 0) {
      query_amenity = " Amenity LIKE '%" + amenities[0] + "%' ";
      for(var i = 1; i < amenities.length ; i++) {
        query_amenity = query_amenity + " OR Amenity LIKE '%" + amenities[i] + "%' "
      }
    } else {
      query_amenity = " Amenity LIKE '%' "
    }

var query = "SELECT V.*, CONCAT(V.fav, '-', (F.listing_id IS NOT NULL)) AS isfav, F.user_id " + 
"FROM ViewListingsAmenities AS V " +
"LEFT OUTER JOIN Favourites AS F " +
"ON V.listing_id = F.listing_id " +
"WHERE V.state = ? AND V.city = ? " +
"AND price_sort >= ? AND price_sort <= ? " +
"AND beds >= ? AND beds <= ? " +
"AND baths >= ? AND baths <= ? " +
"AND Agent_id IN " + req.params.realtors + " " +
"AND ( " + query_amenity + " ) " +
" HAVING user_id = ? ";

    var table = [req.params.state,req.params.city, price_range[0], price_range[1], beds_range[0], beds_range[1], baths_range[0], baths_range[1], req.params.user_id];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.get('/favourites/:user', function(req, res) {
    // res.json(users);
    console.log(req.params.user)

    var query = "SELECT L.listing_id,L.address,L.image,L.beds,L.baths,L.price,C.symbol AS "+
                "currency,L.safety_rating,L.link,R.description AS Agent FROM Listings AS L " +
                "INNER JOIN Currencies AS C " + 
                "ON L.currency = C.currency " +
                "INNER JOIN RealEstateAgents AS R " +
                "ON L.Agent_id = R.agent_id " +
                "INNER JOIN Favourites AS F " +
                "ON L.listing_id = F.listing_id " +
                "WHERE F.user_id = ?";
    var table = [req.params.user];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.post('/favourite', function(req, res) {
    // res.json(users);
    console.log(req.body.user)
    console.log(req.body.listing)

    var query = "INSERT INTO Favourites(user_id,listing_id) VALUE(?,?)";
    var table = [req.body.user,req.body.listing];
    connection.query(query,table, function(err,result){
      if(err) { throw err;
        res.json({"Message" : err});
      } else 
      {
          res.json({"Message" : "Success"});
      }
    });
    // console.log(req.body)


});

app.get('/rss', function(req, res) {

    // res.json(users);

    // console.log(req.body.user)
    // console.log(req.body.listing)

    // var query = "INSERT INTO Favourites(user_id,listing_id) VALUE(?,?)";
    // var table = [req.body.user,req.body.listing];
    // connection.query(query,table, function(err,result){
    //   if(err) { throw err;
    //     res.json({"Message" : err});
    //   } else 
    //   {
    //       res.json({"Message" : "Success"});
    //   }
    // });
    // console.log(req.body)

    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
      host: 'www.phillyvoice.com',
      path: '/feed/tag/arts-culture/'
    };

    callback = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        // console.log(str);
        parseString(str, function (err, result) {
          // console.log(result.rss.channel[0].item0;]);
          res.json(result.rss.channel[0].item);
        });


      });
    }

    http.request(options, callback).end();

});

app.get('/realtor/:realtor', function(req, res) {

    console.log(req.params.realtor)

    var query = "SELECT * FROM RealEstateAgents WHERE agent_id = ?";
    var table = [req.params.realtor];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.get('/allrealtors', function(req, res) {

    console.log(req.params.realtor)

    var query = "SELECT agent_id AS id, description AS name FROM RealEstateAgents";
    var table = [];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.get('/allamenities', function(req, res) {

    console.log(req.params.realtor)

    var query = "SELECT description AS id, description AS name FROM Amenities";
    var table = [];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.get('/safety_ratings/:state/:city', function(req, res) {

    console.log(req.params.state)

    var query = "SELECT L.address, L.safety_rating FROM Listings AS L " +
                "INNER JOIN StateCity AS S " +
                "ON L.state = S.state AND L.city = S.city " +
                "WHERE S.state_text = ? AND S.city_text = ?";
    var table = [req.params.state,req.params.city];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.get('/amenities/:listing_id', function(req, res) {

    console.log(req.params.listing_id)

    var query = "SELECT IA.listing_id, A.description AS Amenity " +
                "FROM IncludedAmenities AS IA " +
                "INNER JOIN Amenities AS A " +
                "ON IA.amenity_id = A.amenity_id " +
                "WHERE IA.listing_id = ?";
    var table = [req.params.listing_id];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});


app.get('/allstates', function(req, res) {

    var query = "SELECT DISTINCT state, state_text  FROM StateCity";
  	var table = [];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});

app.get('/allcities', function(req, res) {

    var query = "SELECT DISTINCT city, city_text FROM StateCity";
  	var table = [];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});


app.get('/allcities/:state', function(req, res) {

    var query = "SELECT DISTINCT city, city_text FROM StateCity WHERE state = ?";
  	var table = [req.params.state];
  	connection.query(query,table, function(err,result){
    	if(err) throw err;
    	else {
        	res.json(result);
    	}
  	});

});


app.get('/listings_bd_bth/:state/:city/:bed/:bath', function(req, res) {
    // res.json(users);
    console.log(req.params.state)
    console.log(req.params.city)

  // var query = 'INSERT INTO Listings(listing_id,address,beds,baths,price,currency,safety_rating,link,longitude,latitude,Agent_id) VALUE(?,?,?,?,?,?,?,?,?,?,?)';
    var query = "SELECT L.listing_id,L.address,L.image,L.price,C.symbol AS " +
                "currency,L.safety_rating,L.link,R.description AS Agent FROM Listings AS L " +
                "INNER JOIN Currencies AS C " +
                "ON L.currency = C.currency " +
                "INNER JOIN RealEstateAgents AS R " +
                "ON L.Agent_id = R.agent_id " +
                "WHERE L.state = ? AND L.city = ? AND L.beds = ? AND " +
                "L.baths = ?";;
    var table = [req.params.state,req.params.city,req.params.bed,req.params.bath];
    connection.query(query,table, function(err,result){
      if(err) throw err;
      else {
          res.json(result);
      }
    });

});

app.listen(3000);
console.log('Listening on 3000');
