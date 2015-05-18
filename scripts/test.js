var expect = chai.expect;

describe("Shrine", function() {
    describe("constructor", function() {
        it("should have a default name", function() {
            var shrine = new Shrine(0);
            expect(shrine.getTeam()).to.equal(0);
        });
    });
});

describe("Player (superclass)", function() {
    describe("constructor", function() {
        it("should work", function() {
            var player = new Player("hassan", 0, 0, 100);
            expect(player.getName()).to.equal("hassan");
            expect(player.getY()).to.equal(0);
            expect(player.getX()).to.equal(0);
            expect(player.getHp()).to.equal(100);

        });
    });
});


describe("Redhatter", function() {
    describe("constructor", function() {
        it("should work", function() {
            var player = new Redhatter("hassan", 0, 0, 100);
            expect(player.getName()).to.equal("hassan");
            expect(player.getY()).to.equal(0);
            expect(player.getX()).to.equal(0);
            expect(player.getHp()).to.equal(100);

        });
    });
});

