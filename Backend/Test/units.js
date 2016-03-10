var assert = require("assert");
var User = require('../app/models/user');
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;

//test test lol
describe("Swag", function() {
    before(function() {
        var game = new Game();
    });
    describe("fly", function() {
        it("should make a fly", function() {
            var fly = new Fly(1);
            fly.setName("hassan");
            assert.equal(fly.getName(), "hassan");
            assert.equal(fly.getCharacterType(), "Fly");
        });
        /*  it("should have zero gold", function() {
            var fly = new Fly("hassan", 1);
            assert.equal(fly.getGold(), 0);
        });*/
        it("should change locations after switching teams", function() {
            var fly = new Fly("hassan", 1);
            fly.setTeam(1);
            assert(fly.getX() > 2500);
            fly.setTeam(0);
            assert(fly.getX() < 1100);
        });
    });
    describe("shanker", function() {
        it("should make a shanker", function() {
            var shanker = new Shanker(1);
            shanker.setName("hassan");
            assert.equal(shanker.getName(), "hassan");
            assert.equal(shanker.getCharacterType(), "Shanker");
        });
        it("should be able to do damage", function() {
            var shanker = new Shanker(1);
            assert.equal(shanker.doDamage(10).dies, {dies: false}.dies);
        });
    });
    describe("redhatter", function() {
        it("should make a redhatter", function() {
            var redhatter = new Redhatter(1);
            redhatter.setName("hassan");
            assert.equal(redhatter.getName(), "hassan");
            assert.equal(redhatter.getCharacterType(), "Redhatter");
        });
        it("shanker can be immobilized", function() {
            var shanker = new Redhatter(1);
            console.log("shanker IS " + JSON.stringify(shanker));
            assert.ok(shanker.immobilize(200));
        });
    });
});
