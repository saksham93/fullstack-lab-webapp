var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members"]);
var express=require("express");
var app = express();
var bodyParser=require('body-parser');

var senddata=require("./authenticate");

var app = express();
app.use(express.static("templates"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post("/new-project",function(req,res)
{
	var arr=[];
	for(var i=0;i<req.body.no_of_people;i++){
		arr.push(req.body.p+)  // code to push all the prople into the array
	}
	var obj={
			pname:req.body.pname,
			no_of_people:req.body.no_of_people,
			about_project:req.body.about_project,
		}
	
	res.sendFile(__dirname+"/templates/mylab.html");
});

