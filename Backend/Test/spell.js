var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var TortStun = require('../spells/tortstun.js').TortStun;

describe("Test Game", function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should  be able to construct a tortstun", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params
        assert.equal(s.getTeam(), 1);
        assert.equal(s.getX(), 200);
        assert.equal(s.getY(), 400);

    });  

    it ("tortstun should have the right qualities", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params
        assert.equal(s.getDamage(), 10);
    });

    /*it ("shouldn't crash", function(){
    });

    it ("able to change game state to 0", function(){


    });
    it ("able to change shrine HP", function(){

    }); */
});
