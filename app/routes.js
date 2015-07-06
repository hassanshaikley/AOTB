module.exports = function(app, passport) {
  app.get('/', function(req, res) {
  if (req.isAuthenticated()){ //if loggedi n go to profile page
    res.redirect('/profile');
  } else {
    res.render('index.ejs', {
      authenticated: req.isAuthenticated(),
      user : req.user,
      name: false
    });
   }
  });
  app.get('/test', function(req, res) {
    res.render('test-index.ejs', {
      authenticated: false,
      user : "",
    });
  });
  app.post('/', function(req, res) {
   // var mongoose = require('mongoose');
    //var Character = mongoose.model('Character');

//    Character.findOne({ "_id" : req.body.charId }, function(err, _character){
 //     if (err) console.log("Shit");
      var nickname = req.user.local.nickname;
      if (!nickname){
          nickname = "idk";
      }

      util.log("NICKNAME" + nickname);

      res.render('index.ejs', {
        authenticated: req.isAuthenticated(),
        name : nickname, // get the user out of session and pass to template
        character : req.body.character_type,
      });


  //  });
  });
/*
  app.post('/create_char', isLoggedIn, function(req, res){
    var mongoose = require('mongoose');
    var Character = mongoose.model('Character');
    //   req.body.char_type
    var c_name = req.body.c_name.replace(/ /g, "");
    if( c_name.length == 0 || c_name.length > 16){
      res.render('create_character.ejs', { message: "Name must be between 1 and 16 character"});
      return;
    }
    var _char = new Character({ race: req.body.char_type, _user: req.user._id, name: c_name });
    _char.save(function(err) {
      if (err) return handleError(err);
      //saved
      res.redirect('/profile');
    });
  });*/

  app.get('/login', isNotLoggedIn, function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/signup', isNotLoggedIn, function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/create_character', isLoggedIn, function(req, res){
    res.render('create_character.ejs', { message: ""});
  });

  app.get('/profile', isLoggedIn, function(req, res) {
//    var mongoose = require('mongoose');
//    var Character = mongoose.model('Character');

  //  Character.find({ "_user" : req.user._id }, function(err, _characters){
   //   if (err) console.log("Shit");
      res.render('profile.ejs', {
        user : req.user, // get the user out of session and pass to template
          message : "nothing"
 //      characters : _characters
      });
 //   });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.post('/newname', function(req, res){
     //util.log(" ~  ~  > " + req.user + " " +req.body.nickname);
      var nickname = req.body.nickname;
      nickname = nickname.substring(0,16);


      var User = require('./models/user');
      util.log (" ID " + req.user.local.email);
      User.findOne( { "local.email" : req.user.local.email }, function(err, doc) {
          User.findOne( { "local.nickname" : nickname }, function (err, doc2){
              if (doc2){
                  res.render('profile.ejs', { user: req.user,  message: "nickname taken" });

                  } else {
                      util.log( doc.local.email);
                      doc.local.nickname = nickname;
                      doc.save();
                      res.redirect('/profile');
              }
              });
          });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (!req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
