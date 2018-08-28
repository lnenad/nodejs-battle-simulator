const unit = require("../entities/unit").unit,
    assert = require('assert');

describe('Unit', function() {
    describe('#instantation()', function() {
        const newUnit = unit("Soldier");

        it('should return valid data upon instantiation', function() {
            assert.equal(newUnit.type, "Soldier");
        });
        it('should have health', function() {
            assert.notEqual(newUnit.health, undefined);
        });
    });
    describe('#health()', function() {
        const newUnit = unit("Soldier");

        it('should return full valid health value', function() {
            assert.equal(newUnit.getHealth(), 100);
        });
    });
});