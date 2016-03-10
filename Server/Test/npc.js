var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Meteor = require("../Spells/meteor.js").Meteor;


//test being able to find a focus character
describe("Test NPC", function() {
    var game;
    beforeEach(function(done) {
        game = new Game();
        done();
    });

    it("find focus in empty game", function() {
        var shank = new Shanker();
        var other = new Shanker();
        game.addPlayer(shank);
        game.addPlayer(other);

        assert.equal(shank.focus, other.idy);

    });
});
