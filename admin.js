var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members"]);
var express=require("express");
var bodyParser=require('body-parser');

var app = express();
app.use(express.static("templates"));
app.set('view engine','ejs');
app.set('views', __dirname + '/templates');

