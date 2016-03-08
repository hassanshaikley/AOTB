var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var DescendAttack = require('../Spells/descend-attack.js').DescendAttack;

describe("Descend Attack", function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should  be able to construct a DescendAttack", function(){
        var s = new DescendAttack(); //x, y, team are params
        assert.ok(s.getID());
    });

    it ("should have a cooldown of 6000", function(){
        var s = new DescendAttack(); //x, y, team are params
        assert.equal(DescendAttack.getCooldown(), 10000);


    });

});
