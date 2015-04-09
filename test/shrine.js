var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Shrine = require('../units/shrine.js').Shrine;

describe("Test Game", function() {
        var game;  
        var shrine;
    beforeEach(function(done){
        game = new Game();
        shrine = new Shrine(0);
        done();
    });

    it ("should be able to make a shrine ", function(){
      assert.equal(shrine.getTeam(), 0);
    });  
    it ("should have hp 3 K ", function(){
      assert.equal(shrine.getHp(), 3000);
    });  
    it ("should be able to set hp", function(){
      assert.equal(shrine.getHp(), 3000);
      shrine.setHp(2500);
      assert.equal(shrine.getHp(), 2500);
    }); 
    it ("should be able to die", function(){
      shrine.setHp(0);
      assert.equal(shrine.getHp(), 0);
      assert.equal(shrine.getHp(), 0);
    });  

});
