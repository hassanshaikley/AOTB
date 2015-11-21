var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var TortStun = require('../Spells/tortstun.js').TortStun;

describe("Test Spells", function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should  be able to construct a tortstun", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params
        assert.equal(s.getTeam(), 1);
        assert.equal(s.getX(), 200);
        assert.equal(s.getY(), 490);

    });  

    it ("tortstun should have the right qualities", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params
        assert.equal(s.getDamage(), 15);
    });

    it ("different spells should have unique ids", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params
        assert.ok(s.getID());

    });
    it ("Should have all these  qualities ", function(){
        var s = new TortStun(0,0, 1);
        assert.ok(s.getDamage());
        assert.ok(s.getX());
        assert.ok(s.getY());
        assert.ok(TortStun.getCooldown());

    });

    /*it ("shouldn't crash", function(){
    });

    it ("able to change game state to 0", function(){


    });
    it ("able to change shrine HP", function(){

    }); */
});
