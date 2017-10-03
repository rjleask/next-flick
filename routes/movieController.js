module.exports = function(app){
	app.get('/', function(req, res){
		res.render("index");
	})
	app.get('/personalize',function(req, res){
		res.render("settings");
	})
}