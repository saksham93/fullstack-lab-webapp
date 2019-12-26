var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members"]);
var express=require("express");
var bodyParser=require('body-parser');
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var app = express();
require('./admin')(app);
require('./user_info')(app);
require('./project')(app);

var store = new MongoDBStore({
  uri: 'mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
  collection: 'sessions'
});

app.use(express.static("templates"));
app.set('view engine','ejs');
app.set('views', __dirname + '/templates');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
  store: store
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var logindata=null;
passport.use(new LocalStrategy(
  function(username, password, done) {
  	var mongojs = require("mongojs");
	const db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/Hutlabs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members","student_wait_list"]);

	var object={
		email:username,
	} 

	db.members.find(object,function(err,data)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(data.length>0)
			{ 	
				logindata=data;
				const hash=data[0].password.toString();
				bcrypt.compare(password, hash, function(err, res) {
				    if(res === true){
				    	return done(null,data[0].email);
				    }
				    else{
				    	return done(null, false);
				    }
				});
			}
		}
	});
  }
));

app.get("/login",function(req,res)
{
	res.sendFile(__dirname+"/templates/login.html");
});
app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/templates/webpage.html");
});
app.get("/register",function(req,res)
{
	res.sendFile(__dirname+"/templates/register.html");
});
app.get("/admin",function(req,res)
{
	findobj={};
	db.student_wait_list.find(findobj,function(err,data){
		res.render('admin',{data:data});
	})
});
const senddata=undefined;
app.get("/my-lab",function(req,res)
{
	console.log(req.user+'i am in lab');
	console.log(req.isAuthenticated());
	res.sendFile(__dirname+"/templates/mylab.html");
	const senddata=req.user;
	console.log(senddata);
	module.exports=senddata;
});

module.exports=senddata;

// app.get("/edit-info",function(req,res)
// {
// 	res.sendFile(__dirname+"/templates/edit_info.html");
// });
// app.post("/login-done/",[
// 	check('username').isEmail(),
// 	check('password').isLength({ min: 8 })
// 	],function(req,res,next)
// {
// 	 const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.send(errors.array());
//   }

// 	var object={
// 		email:req.body.username,
// 		password:req.body.password
// 	} 


	// db.members.find(object,function(err,data)
	// {
	// 	if(err)
	// 	{
	// 		console.log(err);
	// 	}
	// 	else
	// 	{
	// 		if(data.length>0)
	// 		{ 
	// 			res.sendFile(__dirname+"/templates/mylab.html");
	// 		}
	// 		else
	// 		{
	// 			res.send("entered details are wrong")
	// 		}
	// 	}
	// });

// });
app.post('/login-done',passport.authenticate('local',{
	successRedirect : '/my-lab',
	failureRedirect : '/login'
}))
var registerationdata=null;
app.post("/register-done",[
	check('username').isEmail(),
	check('password_1').isLength({ min: 8 }),
	check('password_2').isLength({ min: 8 }),
	],function(req,res)
{
		 const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(errors.array());
  }

	if(req.query.password_1==req.query.password_2)
	{		
		bcrypt.genSalt(10, function(err, salt) {
   			bcrypt.hash(req.body.password_1, salt, function(err, hash) {
   				var rno=req.body.rno.toUpperCase();
					var obj={
						fname:req.body.firstname,
						lname:req.body.lastname,
						email:req.body.username,
						password:hash,
						mobile:req.body.number,
						rollnum:rno
					}
					var checkobj={
						email:req.body.username,
					}
					db.members.find(checkobj,function(err,data)
					{
						if(err)
						{
							console.log("err with members");
						}
						else
						{
							if(data.length>0)
							{ 
								res.send("user already exists");
							}
							else
							{
								// send the object to the admin...
								db.student_wait_list.find(checkobj,function(err,data){
									if(data.length>0){
										res.send("simillar request has already sent by this username. please wait untill the admin's approval");
									}
									else{	
										db.student_wait_list.insert(obj,function(err,data){
											if(err)
											{
												console.log("err")
											}
										});
									}
								});
								//console.log("data sent");
								//res.redirect('/admin?valid='+obj);
								//res.send("success");
							}
						}
					});

					
					// db.members.find(obj,function(err,data,fields){
					// 	if(err)
					// 	{
					// 		console.log(err);
					// 	}
					// 	else
					// 	{
					// 		if(data.length>0)
					// 		{ 
					// 			registerationdata=data;
					// 			req.login(data[0]._id,function(err){
					// 				res.redirect('/my-lab');
					// 			})
					// 		}
					// 	}
					// });
				});
			});
	}
	else
	{
		res.send("passwords do not match");
	}
});
passport.serializeUser(function(id, done) {
  done(null,id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
} 	

app.listen(4000,function()
{
	console.log("SERVER STARTED SUCCESSFULLY................")
})