
var fs = require('fs');

var csv = require('fast-csv');

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents2');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents2');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var insertCrimeData = function(db, callback) {

// Get the documents collection
collection = db.collection('crimeStats');
collection.remove();

fs.createReadStream('crime.csv')
  .pipe(csv())
  .on('data', function(data) {

  if(data[12] != "" && data[13] != "") {
    // Insert some documents
    collection.insertMany([
      {crime_ucr: data[8], crime_text : data[9], latitude : data[12], longitude : data[13]}
    ], function(err, result) {
      console.log("Inserted documents into the collection");
      callback(result);
    });    
  }



  })
  .on('end', function(data){
   console.log('Read finished');
  });
}


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
// var url = 'mongodb://localhost:27017/myproject';
var url = "mongodb://redroofs:redroofs@redroofs-shard-00-00-2lh9v.mongodb.net:27017,redroofs-shard-00-01-2lh9v.mongodb.net:27017,redroofs-shard-00-02-2lh9v.mongodb.net:27017/redroofsdb?ssl=true&replicaSet=redroofs-shard-0&authSource=admin"
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertCrimeData(db, function() {
    db.close();
  });
});
