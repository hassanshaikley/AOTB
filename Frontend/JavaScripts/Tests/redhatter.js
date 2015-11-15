describe("Redhatter", function() {
    var game;
    beforeEach(function(done) {
        game = new Game();
        done();
    });
    it("should be able to get name", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("name", x, y);
        assert.equal(redhatter.getName(), "hassan");
    });
    it("should get character type", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("name", x, y);
        assert.equal(redhatter.getCharacterType(), "Redhatter");
    });
});