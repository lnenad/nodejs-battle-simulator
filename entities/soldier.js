const random = require("../utils").random,
    unitMod = require("./unit"),
    unit = unitMod.unit,
    canDoDamage = unitMod.canDoDamage;


const soldier = () => {
    const state = unit();

    return Object.assign({}, state, {doDamage: canDoDamage(state, () => {
        return 0.5 * (1 + state.health/100) * random(30 + state.experience, 100) / 100;
    })});
};

module.exports = soldier;