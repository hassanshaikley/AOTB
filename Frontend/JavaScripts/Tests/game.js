describe("Game", function() {
    describe("Game object", function() {
        it("should have blood", function() {
            var testGame = new Game();
            expect(testGame.bloods.length).to.equal(0));

        });
    });
});