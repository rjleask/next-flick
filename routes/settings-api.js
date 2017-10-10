var db = require("../models");
module.exports = function(app) {
  var usernameFromCookie = '';
  var userId = 0;

  app.post("/api/settings", function(req, res) {

    usernameFromCookie = req.cookies.user;

    db.User.findOne({
      where: {
        md5username: usernameFromCookie
      }
    }).then(function(data) {
      if (data) {
        // console.log("the id for this user is: ", data.id);
        userId = data.id;
      } else {
        console.log("we have a problem");
      }

      console.log('userId: ' + userId);
      db.Settings.create({
        action: req.body.action,
        comedy: req.body.comedy,
        horror: req.body.horror,
        drama: req.body.drama,
        UserId: userId
      }).then(function(data) {

      })


    })

  })
}