describe("Redhatter", function() {
    it("should be able to get name", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("hassan", x, y);
        expect(rh.getName()).to.equal("hassan");
    });

    it("should get character type", function() {
        var x = 1;
        var y = 1;
        var rh = new Redhatter("name", x, y);
        expect(rh.getCharacterType()).to.equal("Redhatter");

    });
});