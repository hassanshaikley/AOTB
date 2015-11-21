var assert = require("assert");
var testhelper = require('./testhelper');
var Game = require('../game.js').Game;
var TortStun = require('../Spells/tortstun.js').TortStun;
var Redhatter = require('../units/redhatter.js').Redhatter;


describe("Test Spells", function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should  be able to construct a tortstun", function(){
        var s = new TortStun(200, 400, 1); //x, y, team are params , y should be 490 no matter wat
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
        assert.ok(s.getID());

    });
    it ("Should have all these  qualities ", function(){
        var s = new TortStun(20,20, 1);
        assert.ok(s.getDamage());
        assert.ok(s.getX());
        assert.ok(s.getY());
        var y = new Redhatter(0);
         assert.ok(s.doEffect(y));

        assert.ok(TortStun.getCooldown());
        assert.ok(s.getDamage());

    });

    /*it ("shouldn't crash", function(){
    });

    it ("able to change game state to 0", function(){


    });
    it ("able to change shrine HP", function(){

    }); */
});
