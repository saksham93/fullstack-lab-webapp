var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members","student_wait_list"]);
var express=require("express");
var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var senddata=require('./authenticate');

app.use(express.static("templates"));
app.set('view engine','ejs');
app.set('views', __dirname + '/templates');

module.exports = function(app){
	app.get('/add',function(req,res){
		var check={
			email:req.query.accept
		}
		db.student_wait_list.find(check,function(err,data){
			if(err){
				console.log(err);
			}
			else{
				db.members.insert(data[0],function(err,data)
				{	
						if(err)
						{
							console.log(err)
						}
						else{
							//console.log(data);
							db.student_wait_list.remove(data);
						}
				});
			}
		})
	});

	app.get('/reject',function(req,res){
		var check={
			email:req.query.reject
		}
		db.student_wait_list.remove(check);
	});
}