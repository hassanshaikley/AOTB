var assert = require("assert");
var testhelper = require('./testhelper');
var server = require('./server.js').Server;
var Game = require('../game.js').Game;
var AttackManager = require('../attack-manager.js').AttackManager;

var Redhatter = require('../units/redhatter.js').Redhatter;



describe("Attacks", function() {
    var game;
    var rh;
    var rh;
    beforeEach(function() {
        game = new Game();
        rh1 = new Redhatter(0);
        rh2 = new Redhatter(1);
        game.addPlayer(rh1);
        game.addPlayer(rh2);

    });
    it("should add an attack", function() {
        // 
        
    });
});