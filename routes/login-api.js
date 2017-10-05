var db = require("../models");
module.exports = function(app){
	app.post("/api/login", function(req, res){
    db.Logins.create({
    	username: req.body.username,
    	comedy: req.body.password
    }).then(function(){
    	res.redirect("/");
    })
		console.log(req.body);
	})
}	