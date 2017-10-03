module.exports = function(app){
	app.get("/api/settings", function(req, res){
		console.log(req.body);
	})
}	