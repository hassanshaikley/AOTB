var BUC = require("../units/base_unit_component").BaseUnitComponent;

describe("Test Game", function() {
    var game;
    beforeEach(function(done){
        game = new Game();
        done();
    });

    it ("should idk", function(){
        var buc = new BUC(100, 5);

                assert.equal(buc.x, 5); 

    });  
});
