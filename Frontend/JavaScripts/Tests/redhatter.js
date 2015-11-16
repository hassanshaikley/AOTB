describe("Redhatter", function() {
    it("should be able to get name", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("hassan", x, y);
        assert.equal(redhatter.getName(), "hassan");
    });

    it("should get character type", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("name", x, y);
        assert.equal(redhatter.getCharacterType(), "Redhatter");
    });
});