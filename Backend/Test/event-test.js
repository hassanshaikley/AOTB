var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;
var Meteor = require("../Spells/meteor.js").Meteor;

describe("Test Events: ", function() {
    var game;
    beforeEach(function(done) {
        game = new Game();
        done();
    });

    it("add a non existent spell shouldnt work", function() {
        assert.equal(game.addSpell(), 0);
    });
 });
