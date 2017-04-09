var mysql = require('mysql');

var pool =  mysql.createPool({
host : 'redroofs.clmzagnk9vbp.us-east-1.rds.amazonaws.com',
user : 'redroofs',
password: 'redroofs',
port     : '3306',
database: 'redroofs'
});

var insertListing = 'INSERT INTO Listings(listing_id,address,beds,baths,price,currency,safety_rating,link,longitude,latitude,Agent_id) VALUE(?,?,?,?,?,?,?,?,?,?,?)';

pool.getConnection(function(err, connection){    
  // //Create a table called employee
  // connection.query(createTable,  function(err){
  //   if(err) throw err;
  //   else {
  //       console.log('Table created!');
  //   }
  // });
 
  //Incsert a record.
  connection.query(insertListing,[1,"address herer",3,4,9000,"USD",5,"linkherer",456.7888,454.098845,"CAPT"], function(err,res){
    if(err) throw err;
    else {
        console.log('A new employee has been added.');
    }
  });
});  