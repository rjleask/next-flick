var db = require("../models");
module.exports = function(app) {
  var usernameFromCookie = '';
  var userId = 0;

  app.post("/", function(req, res) {

    usernameFromCookie = req.cookies.user;
    // if (!usernameFromCookie) {
    //   console.log("Houston, we have a problem!");
    // } else {
    //   console.log("username: " + usernameFromCookie);
    // }

    db.User.findOne({
      where: {
        md5username: usernameFromCookie
      }
    }).then(function(data) {
      if (data) {
        console.log("the id for this user is: ", data.id);
        userId = data.id;
      } else {
        console.log("we had a problem");
      }

      console.log('userId: ' + userId);
      db.Settings.create({
        action: req.body.action,
        comedy: req.body.comedy,
        horror: req.body.horror,
        drama: req.body.drama,
        UserId: userId
      }).then(function(data) {
        res.send(data);
      })


    })

  })
}