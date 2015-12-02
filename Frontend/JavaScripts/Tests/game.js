describe("Game", function() {
    describe("Game object", function() {
        it("should have no blood", function() {
            expect(localGame.bloods.length).to.equal(0);

        });
        it("defunct test", function() {
            var blood = new Blood(1,2);
//w            expect(blood.getX()).to.equal(1);
//            expect(blood.getY()).to.equal(2);


        });
    });
});
