var db = require("../models");
module.exports = function(app){
	app.post("/api/settings", function(req, res){
    db.Settings.create({
    	action: req.body.action,
    	comedy: req.body.comedy,
    	horror: req.body.horror,
    	drama: req.body.drama
    }).then(function(){
    	res.redirect("/");
    })
		console.log(req.body);
	})
}	