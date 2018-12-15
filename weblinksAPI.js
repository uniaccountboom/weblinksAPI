
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('weblinksDB');

var multer = require('multer');
var upload = multer();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var express = require('express');
var restapi = express();

restapi.use(bodyParser.json({limit: '1mb'}));
restapi.use(bodyParser.urlencoded({extended : true}));


//add a table and some test data
db.serialize(function() {
 db.run("CREATE TABLE IF NOT EXISTS weblinks (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, rating INTEGER, description TEXT)");
 db.run("DELETE FROM weblinks");
 db.run("INSERT INTO weblinks (url, rating, description) VALUES (?, ?, ?)",
"http://www.bbc.co.uk",6,"British news website ");
});


restapi.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


   
//default
restapi.get('/', function(req, res){
  res.send('HELLO WORLD');
});


restapi.listen(3000);
console.log("Up and running..");