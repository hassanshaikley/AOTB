module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs', { authenticated: req.isAuthenticated(), 
      user : req.user,
    characterType : "Fly"
    }); 
  });
  app.post('/', function(req, res) {
    var mongoose = require('mongoose');
    var Character = mongoose.model('Character');
    Character.findOne({ "_id" : req.body.charId }, function(err, _character){
      if (err) console.log("Shit");
      res.render('index.ejs', {
        authenticated: req.isAuthenticated(),
        user : req.user, // get the user out of session and pass to template
        character : _character
      });
    });
  });
  app.post('/create_char', isLoggedIn, function(req, res){
    var mongoose = require('mongoose');
    var Character = mongoose.model('Character');
 //   req.body.char_type
    var c_name = req.body.c_name.replace(/ /g, "");
    var _char = new Character({ race: req.body.char_type, _user: req.user._id, name: c_name });

    _char.save(function(err) {
      if (err) return handleError(err); 
      //saved
      res.redirect('/profile');
    });
//req.user._id 
 //   res.render('sup'); 
  });
  app.get('/login', isNotLoggedIn, function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });

  app.get('/signup', isNotLoggedIn, function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/create_character', isLoggedIn, function(req, res){
    res.render('create_character.ejs');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    var mongoose = require('mongoose');
    var Character = mongoose.model('Character');
    //console.log(req.user._id);
    Character.find({ "_user" : req.user._id }, function(err, _characters){
      if (err) console.log("Shit");
      console.log("CHARS ARE " + _characters);
      res.render('profile.ejs', {
        user : req.user, // get the user out of session and pass to template
        characters : _characters
      });
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

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
