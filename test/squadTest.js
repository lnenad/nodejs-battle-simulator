const unit = require("../entities/unit").unit,
    squad = require("../entities/squad"),
    assert = require('assert');

describe('Squad', function() {
    describe('#instantation()', function() {
        const newSquad = squad([unit("Soldier"),unit("Soldier"),unit("Soldier"),unit("Soldier"),unit("Soldier"),unit("Soldier")]);

        it('should have units upon instantiation', function() {
            assert.equal(newSquad.units.length, 7);
        });
    });
});