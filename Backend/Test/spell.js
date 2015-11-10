var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var TortStun = require('../spells/tortstun.js').TortStun;
var Meteor = require('../spells/meteor.js').Meteor;
var Stealth = require('../spells/stealth.js').Stealth;

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
        var x = new Meteor();
        var y = new Stealth();
        assert.notEqual(x.getID(), y.getID());
        assert.notEqual(s.getID(), x.getID());

    });

    /*it ("shouldn't crash", function(){
    });

    it ("able to change game state to 0", function(){


    });
    it ("able to change shrine HP", function(){

    }); */
});
