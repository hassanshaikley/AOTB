var expect = chai.expect;

console.log("HI HOE TEST BRO");

describe("Shrine", function() {
    describe("constructor", function() {
        it("should have a default name", function() {
            var shrine = new Shrine(0);
            expect(shrine.getTeam()).to.equal(0);
        });
    });
});

