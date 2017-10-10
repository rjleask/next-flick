var db = require("../models");
var md5 = require("md5");

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

    }
    res.render("index", { loggedIn: loggedIn });
  })
  // app.get('/movie', function(req, res) {
  //   res.render("movie")
  // })
  app.post('/movie', function(req, res) {
    var moviePacket = {
      movieTitle: req.body.movieTitle,
      moviePoster: req.body.moviePoster,
      movieId: req.body.movieId,
      movieBackdrop: req.body.movieBackdrop,
      movieOverview: req.body.movieOverview,
      movieRating: req.body.movieRating,
      movieRelease: req.body.movieRelease,
      movieRuntime: req.body.movieRuntime
    }
    res.render("movie",{moviePacket:moviePacket});
    // res.render("movie", { moviePacket: moviePacket });
  })
  // personalize settings
  app.get('/personalize', function(req, res) {
    res.render("settings");
  })


  // Registration, enter into database as new user
  app.post('/', function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.modalUsername,
        password: req.body.modalPassword
      }
    }).then(function(data) {
      // console.log(data);
      if (data) {
        console.log("user exists", data);
        res.redirect("/");
      } else {
        db.User.create({
          username: req.body.modalUsername,
          password: req.body.modalPassword,
          md5username: md5(req.body.modalUsername)
        });
        res.redirect("/");

      }
      console.log("weere good to go");
    })
  })
  // post cookie data
  app.post('/api/cookie', function(req, res) {

    var options = {
      maxAge: 1000 * 60 * 25, // would expire after 15 minutes
      httpOnly: false, // The cookie only accessible by the web server
      // signed: true // Indicates if the cookie should be signed
    }
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function(data) {
      console.log(data);
      if (data !== null) {
        res.cookie('user', md5(req.body.password), options) // options is optional
        res.json(true);
      } else {
        console.log("User not found");
        res.json(false);
      }
    })


    // // Set cookie
    // res.end();
  });


}