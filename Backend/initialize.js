/* Defines a bunch of variables and settings */
var Game = require('./game.js').Game;
module.exports = {
    //loads all the libraries into this object : D
    loadLibraries: function() {
        this.hi = "hello"; // hello for good measure
        this.mongoose = require('mongoose'); // DB simplifier
        this.passport = require('passport'); // Authentication
        this.express = require("express"); // Express JS
        this.flash = require('connect-flash'); // Flash Messages
        this.port = 5000; // Locally uses port 5000, else uses port of server
        this.configDB = require('./Config/database.js');
        this.cookieParser = require('cookie-parser');
        this.bodyParser = require('body-parser');
        this.session = require('express-session');
        this.app = this.express(); //Express for server
        this.server = require('http').createServer(this.app);
        this.io = require("socket.io").listen(this.server);
        this.MongoStore = require('connect-mongo')(this.session);
        require('./Config/passport')(this.passport); // pass passport for configuration
        return this;
    },
    initialize: function() {
        this.mongoose.connect(this.configDB.url); // connect to our database
        this.app.use(this.cookieParser()); // read cookies (needed for auth)
        this.app.use(this.bodyParser()); // get information from html forms
        this.app.use(this.flash());
        this.app.use(this.session({
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
            maxAge: new Date(Date.now() + 3600000), //lonely life of a session
            store: new this.MongoStore({
                url: this.configDB.url
            }, function(err) {
                console.log(err || 'connect-mongodb setup ok');
            })
        }));
        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session()); // persistent login sessions
        this.app.set('views',__dirname+'/../Frontend/Views');
        require('./App/routes.js')(this.app, this.passport);
        this.app.engine('html', require('ejs').renderFile);
        //    this.app.use(this.logfmt.requestLogger());
        this.app.use("/styles", this.express.static(__dirname+'/../Frontend/CSS'));
        this.app.use("/scripts", this.express.static(__dirname+'/../Frontend/JavaScripts'));
        this.app.use("/localAssets", this.express.static(__dirname+'/../Frontend/Images'));
        //at the end get this server to listen up friends : D
        var port = this.port;
        this.server.listen(port, function() {
            console.log("Listening on " + port);
        });
        game1 = new Game(); //terrible design swagger
        players = []; // Array of connected players
    }
};
