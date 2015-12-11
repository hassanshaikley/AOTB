var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;
var Meteor = require("../Spells/meteor.js").Meteor;
var Events = require("../events.js").Events;

describe("Test Events: ", function() {
    var game;
    var event;
    before(function(done) {
        event = new Events();
        done();
    });
    beforeEach(function(done) {
        game = new Game();
        done();
    });

    it("switch team", function() {
        assert.equal(game.addSpell(), 0);
        var shank = new Shanker();
        game.addPlayer(shank);
        shank.setTeam(0);
        assert.equal(shank.getTeam(), 0);
        event.onSwitchTeam.apply({id: shank.id});
        assert.equal(shank.getTeam(), 1);

    });
 });
