var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members"]);
var express=require("express");
var app = express();
var bodyParser=require('body-parser');


var app = express();
app.use(express.static("templates"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/edit-info",function(req,res)
{
	res.sendFile(__dirname+"/templates/edit-info.html");
});

app.post('/edit-done',function(req,res){

	// object={email:}
	data_object={
		fname:req.body.firstname,
		lname:req.body.lastname,
		email:req.body.username,
		mobile:req.body.number,
		aboutme:req.body.aboutme
	}
	
});
