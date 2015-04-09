var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Shrine = require('../units/shrine.js').Shrine;

describe("Test Game", function() {
        var game;  
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should be able to make a shrine ", function(){
      assert.equal(game.shrine_0.getTeam(), 0);
    });  
    it ("should have hp 3 K ", function(){
      assert.equal(game.shrine_0.getHp(), 3000);
    });  
    it ("should be able to set hp", function(){
      assert.equal(game.shrine_0.getHp(), 3000);
      game.shrine_0.setHp(2500);
      assert.equal(game.shrine_0.getHp(), 2500);
    }); 
    it ("should be able to die", function(){
      game.shrine_0.setHp(0);
      assert.equal(game.shrine_0.getHp(), 0);
      assert.equal(game.shrine_0.getHp(), 0);
    });  

});
