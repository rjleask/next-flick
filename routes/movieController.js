module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render("index");
  })
  app.get('/personalize', function(req, res) {
    res.render("settings");
  })
  app.get('/cookie', function(req, res) {
    // read cookies
    console.log(req.cookies) 

    var options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('cookieName', 'cookieValue', options) // options is optional
  });
}