describe("Fly", function() {
    it("should be able to get name", function() {
        var x = 1;
        var y = 1;
        var player = new Fly("hassan", x, y);
        expect(player.getName()).to.equal("hassan");
    });

    it("should get width, height, x, y", function() {
        var x = 1;
        var y = 1;
        var player = new Fly("hassan", x, y);
        expect(player.getX()).to.equal(1);
        expect(player.getY()).to.equal(1);
        expect(player.getWidth()).to.equal(60);
        expect(player.getHeight()).to.equal(70);



    });
});
