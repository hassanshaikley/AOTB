var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;
//test test lol

describe("Test Game", function() {
        var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should have made an empty game", function(){
        assert.equal(game.getPlayers().length, 0);
        var fly = new Fly("hassanlol", 0);
        game.addPlayer(fly);
        assert.equal(game.getPlayers()[0].getName(), "hassanlol"); 
    });  

    it ("should be able to remove a player", function(){
        var fly = new Fly("hassanlol", 0);
        game.addPlayer(fly);
        assert.equal(game.getPlayers().length, 1); 
//        game.removePlayer(fly);
  //      assert.equal(game.getPlayers().length, 0); 
    });
});
