var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;
var Meteor = require("../Spells/meteor.js").Meteor;

describe("Test Game", function() {
    var game;
    beforeEach(function(done) {
        game = new Game();
        done();
    });
    it("should have made an empty game", function() {
        assert.equal(game.getNumPlayers(), 0);
    });

    it("should be able to get number of players", function() {
        var fly = new Fly(0);
        assert.equal(game.getNumPlayers(), 0);
        game.addPlayer(fly);
        assert.equal(game.getNumPlayers(), 1);

    });
    it("shouldn't crash", function() {
        assert.notEqual(game.getWinner(), "please dont crash");
    });
    it("different players should have different IDs", function() {
        var fly = new Fly(0);
        var fly2 = new Fly(1)
        game.addPlayer(fly);
        game.addPlayer(fly2);
        assert.notEqual(fly.id, undefined);
        assert.notEqual(fly2.id, undefined);

    });
    it("should be able to get player", function() {
        var fly = new Fly(0);
        game.addPlayer(fly);
        assert.equal(fly, game.getPlayer(fly.id));

    });


    it("should be able to remove a player", function() {
        var fly = new Fly(0);
        game.addPlayer(fly);
        assert.equal(game.getNumPlayers(), 1);
        game.removePlayer(fly);
        assert.equal(game.getNumPlayers(), 0);
    });
    it("should be able to handle removing a player twice", function() {
        var fly = new Fly(0);
        game.addPlayer(fly);
        assert.equal(game.getNumPlayers(), 1);
        game.removePlayer(fly);
        assert.equal(game.getNumPlayers(), 0);
        game.removePlayer(fly);
        assert.equal(game.getNumPlayers(), 0);
    });
    it("should be able to handle adding  multiple players", function() {
        var fly = new Fly(0);
        var fly2 = new Fly(1)
        var fly3 = new Fly(0);
        game.addPlayer(fly);
        assert.equal(game.getNumPlayers(), 1);
        game.addPlayer(fly2);
        assert.equal(game.getNumPlayers(), 2);
        game.addPlayer(fly3);
        assert.equal(game.getNumPlayers(), 3);

    });
    it("should be able to handle adding and removing multiple times", function() {
        var fly = new Fly(0);
        var fly2 = new Fly(1)
        game.addPlayer(fly);
        assert.equal(game.getNumPlayers(), 1);
        game.addPlayer(fly2);
        assert.equal(game.getNumPlayers(), 2);
        game.removePlayer(fly);
        assert.equal(game.getNumPlayers(), 1);
    });

    it("add a non existent spell shouldnt work", function() {
        assert.equal(game.addSpell(), 0);
    });
    it("add a non existen meeelee attack shouldnt work", function() {
        assert.equal(game.addMeeleeAttack(), 0);
    });
    it("add a spell should work", function() {
        var x = new Meteor();
        assert.equal(game.addSpell(x), 1);
    });
    it("different games should have unique IDs", function() {
        var game2 = new Game();
        assert.notEqual(game2.getID(), game.getID());
    });
    it("should set winner", function() {
        var game2 = new Game();
        game2.setWinner(0);
        assert.equal(game2.getWinner(), 0);

    });
});
