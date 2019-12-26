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

module.exports = function(app){
	app.post("/new-project",function(req,res)
	{
		// var arr=[];
		// var nop=req.body.no_of_people;
		// for(var i=1;i<=nop;i++){
		// 	arr.push(req.body.p+i.toString())  // code to push all the prople into the array
		// }
		var obj={
				//pname:req.body.pname,
				//no_of_people:nop,
				//teammates:arr,
				about_project:req.body.about_project
			}
		console.log(obj);
		//res.sendFile(__dirname+"/templates/mylab.html");
	});
}