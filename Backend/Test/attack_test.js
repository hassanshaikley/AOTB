var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Attack = require('../units/Attacks/attack.js').Attack;
var Shanker = require('../units/shanker.js').Shanker;

describe("Attacks ", function() {
    var game;
    beforeEach(function(done) {
        game = new Game();
        done();
    });
    it("should  be able to construct an attack with team", function() {
        var s = new Attack({
            team: 0,
            damage: 5,
            effect: function(player) {
                player.immobilize(1000);
            }
        }); //x, y, team are params
        assert.equal(s.getTeam(), 0);
    });
    it("should  be able to construct an attack with damage", function() {
        var s = new Attack({
            team: 0,
            damage: 5,
            effect: function(player) {
                player.immobilize(1000);
            }
        }); //x, y, team are params
        assert.equal(s.getDamage(), 5);
    });
        it("should  be able to construct an attack with an effect", function() {
        var s = new Attack({
            team: 0,
            damage: 5,
            effect: function(player) {
                player.immobilize(1000);
            }
        }); //x, y, team are params
        var shanker = new Shanker(1);
        s.doEffect(shanker);
        assert.equal(shanker.getImmobilize(), true);
    });
});