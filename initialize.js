/* Defines a bunch of variables and settings */

module.exports = {
  //loads all the libraries into this object : D 
  loadLibraries : function(){
    this.hi = "hello"; // hello for good measure
    this.util          = require("util");
    this.logfmt = require("logfmt"); // Heroku key-value logger
    this.mongoose = require('mongoose'); // DB simplifier
    this.passport = require('passport'); // Authentication
    this.express = require("express"); // Express JS
    this.flash    = require('connect-flash'); // Flash Messages
    this.port = Number(process.env.PORT || 5000); // Locally uses port 5000, else uses port of server
    this.configDB      = require('./config/database.js');
    this.cookieParser  = require('cookie-parser');
    this.bodyParser    = require('body-parser');
    this.session       = require('express-session');
    this.app = this.express(); //Express for server
    this.server        = require('http').createServer(this.app);
    this.io            = require("socket.io").listen(this.server);
    this.MongoStore   = require('connect-mongo')(this.session);

    require('./config/passport')(this.passport); // pass passport for configuration
    return this;
    
  },
  initialize : function(){
    this.mongoose.connect(this.configDB.url); // connect to our database
    this.app.use(this.cookieParser()); // read cookies (needed for auth)
    this.app.use(this.bodyParser()); // get information from html forms
    this.app.use(this.flash()); 
    this.app.use(this.session({
      resave: true,
      saveUninitialized: true,
      secret:'secret',
      maxAge: new Date(Date.now() + 3600000), //lonely life of a session
      store: new this.MongoStore(
        {url: this.configDB.url },
        function(err){
          console.log(err || 'connect-mongodb setup ok');
        })
    }));
    this.app.use(this.passport.initialize());
    this.app.use(this.passport.session()); // persistent login sessions
    this.app.set('views', __dirname + '/views');
    require('./app/routes.js')(this.app, this.passport); 
    this.app.engine('html', require('ejs').renderFile);
    this.app.use(this.logfmt.requestLogger());
    this.app.use("/styles", this.express.static(__dirname + '/styles'));
    this.app.use("/localAssets", this.express.static(__dirname + '/localAssets'));
    this.app.use("/scripts", this.express.static(__dirname + '/scripts'));

     //at the end get this server to listen up friends : D
     var port = this.port;
    this.server.listen(port, function() {
      console.log("Listening on " + port);
    });
    shrine_0 =new Shrine(0);
           shrine_1 =new Shrine(1);
          game1 = new Game(); //terrible design swagger
          team0=[];
          team1=[];

  }
};





/* Defines a bunch of global variables and settings */
/*
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
      var Game = require("./game.js").Game;
      //var shrine 
           //Game Related Stuff
           players = [];  // Array of connected players
           AI = [];

           //at the end get this server to listen up friends : D
           server.listen(port, function() {
  				console.log("Listening on " + port);
			});

         }
};
*/