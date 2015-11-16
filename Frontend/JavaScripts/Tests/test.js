var expect = chai.expect;

describe("Player (superclass)", function() {
    describe("constructor", function() {
        it("should work", function() {
            var player = new Player(0, 0, 100, "hassan");
            expect(player.getName()).to.equal("hassan");
            expect(player.getY()).to.equal(0);
        });
    });
});


describe("Redhatter", function() {
    describe("constructor", function() {
        it("should work", function() {
            var player = new Redhatter("hassan", 0, 0);
            expect(player.getName()).to.equal("hassan");
            expect(player.getY()).to.equal(0);
            expect(player.getX()).to.equal(0);
            expect(player.getHp()).to.equal(70);

        });
    });
});


describe("Socket", function() {
    describe("eh", function() {
        it("should init", function() {
            var player = new Redhatter("hassan", 0, 0, 100);

          //  socket.emit("i");

        });
    });
});
