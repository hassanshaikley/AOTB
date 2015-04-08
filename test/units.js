var assert = require("assert");
var User = require('../app/models/user');
var testhelper = require('./testhelper');
var game = require('../game.js').Game;
var fly = require('../units/fly.js').Fly;
var redhatter = require('../units/redhatter.js').Redhatter;
var shanker = require('../units/shanker.js').Shanker;
//test test lol

describe("Swag", function() {
    before(function(){
        var Game = new Game();
    });
  describe("fly", function() {
    	it("should detect malformed JSON strings", function(){
      	var fly = new Fly();
    });
  });
});

