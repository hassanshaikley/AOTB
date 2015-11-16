describe("Shanker", function() {
    it("should be able to get name", function() {
        var x = 1;
        var y = 1;
        var sh = new Shanker("hassan", x, y);
        expect(sh.getName()).to.equal("hassan");
    });

    it("should get character type", function() {
        var x = 1;
        var y = 1;
        var sh = new Shanker("name", x, y);
        expect(sh.getCharacterType()).to.equal("Shanker");

    });
});