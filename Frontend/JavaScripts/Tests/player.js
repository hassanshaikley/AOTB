describe("Player (superclass)", function() {

    describe("constructor", function() {
        it("should work", function() {
            var player = new Player(0, 0, 100, "hassan");
            expect(player.getName()).to.equal("hassan");
            expect(player.getY()).to.equal(0);
        });

        it("should be able to set team", function(){
            var player = new Player(0, 0, 100, "hassan");
            player.setTeam(1);
            expect(player.getTeam()).to.equal(1);
            player.setTeam(0);
            expect(player.getTeam()).to.equal(0);
        });

        it("should be able to set team", function(){
            var player = new Shanker(0, 0, 100, "hassan");
            player.setTeam(1);
            expect(player.getTeam()).to.equal(1);
            player.setTeam(0);
            expect(player.getTeam()).to.equal(0);
        });
    });

});
