var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// var db = require("./models");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public/assets/css'));
app.use(bodyParser.urlencoded({ extended: false }));

// // Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));
require("./routes/movieController.js")(app);


var PORT = process.env.PORT || 3000;
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });

