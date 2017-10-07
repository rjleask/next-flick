var db = require("../models");
module.exports = function(app) {
  // cookie on initial page load
  app.get('/', function(req, res) {
    var cookie = req.cookies.user;
    var loggedIn = false;
    if (cookie === undefined) {
      // need to disable login
      console.log("new user");
    } else {
      // need to come up with suggestions for logged in user
      loggedIn = true;
      console.log(cookie);
    }
    res.render("index", { loggedIn: loggedIn });
  })
  // personalize settings
  app.get('/personalize', function(req, res) {
    res.render("settings");
  })
  // sign up modal form, enter into database as new user
  app.post('/', function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.modalUsername,
        password: req.body.modalPassword
      }
    }).then(function(data) {
      if (data) {
        console.log("user exists", data);
      } else {
        console.log("weere good to go");
        res.redirect("/");
      }
    })
  })
  // post cookie data
  app.post('/api/cookie', function(req, res) {
    console.log("gets to POST");

    var options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      // signed: true // Indicates if the cookie should be signed
    }
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      res.cookie('user', req.body.password, options) // options is optional
      res.json(true);
    })


    // // Set cookie
    // res.end();
  });


}