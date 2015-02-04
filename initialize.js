/* Defines a bunch of global variables and settings */

module.exports = {
  load : function() {
           express = require("express"); // Express JS
           logfmt = require("logfmt"); // Heroku key-value logger
           mongoose = require('mongoose'); // DB simplifier
           passport = require('passport'); // Authentication
           flash    = require('connect-flash'); // Flash Messages
           port = Number(process.env.PORT || 5000); // Locally uses port 5000, else uses port of server
           configDB      = require('./config/database.js');
           cookieParser  = require('cookie-parser');
           bodyParser    = require('body-parser');
           session       = require('express-session');
           mongoose.connect(configDB.url); // connect to our database
           app = express(); //Express for server
           server        = require('http').createServer(app);
           util          = require("util");
           io            = require("socket.io").listen(server);
           MongoStore   = require('connect-mongo')(session);
           require('./config/passport')(passport); // pass passport for configuration
           app.use(cookieParser()); // read cookies (needed for auth)
           app.use(bodyParser()); // get information from html forms
           app.use(flash()); 
           app.use(session({
             secret:'secret',
             maxAge: new Date(Date.now() + 3600000), //lonely life of a session
             store: new MongoStore(
               {url: configDB.url },
               function(err){
                 console.log(err || 'connect-mongodb setup ok');
               })
           }));
           app.use(passport.initialize());
           app.use(passport.session()); // persistent login sessions
           app.set('views', __dirname + '/views');
           require('./app/routes.js')(app, passport); 
           app.engine('html', require('ejs').renderFile);
           app.use(logfmt.requestLogger());
           app.use("/styles", express.static(__dirname + '/styles'));
           app.use("/localAssets", express.static(__dirname + '/localAssets'));
           app.use("/scripts", express.static(__dirname + '/scripts'));
           var Shrine = require("./shrine.js").Shrine; // Express JS
          //var shrine 
           //Game Related Stuff
           players = [];  // Array of connected players
           AI = [];
           shrine_0 =new Shrine(0);
           shrine_1 =new Shrine(1);
          team0=[];
          team1=[];
           //at the end get this server to listen up friends : D
           server.listen(port, function() {
  				console.log("Listening on " + port);
			});

         }
};
