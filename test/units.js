var assert = require("assert");
var User = require('../app/models/user');
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var Fly = require('../units/fly.js').Fly;
var Redhatter = require('../units/redhatter.js').Redhatter;
var Shanker = require('../units/shanker.js').Shanker;
//test test lol

describe("Swag", function() {
    before(function(){
        var game = new Game();
    });
    describe("fly", function() {
        it("should make a fly", function(){
            var fly = new Fly("hassan", 1);
            assert.equal(fly.getName(), "hassan");
        });
    });
});

