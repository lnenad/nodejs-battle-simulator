const random = require("../utils").random,
    unitMod = require("./unit"),
    unit = unitMod.unit,
    canDoDamage = unitMod.canDoDamage,
    canLoseHealth = unitMod.canLoseHealth;


const soldier = () => {
    const state = unit();

    return Object.assign(state, canDoDamage(
            state,
            () => (0.5 * (1 + state.health/100) * random(30 + state.experience, 100) / 100),
            () => (0.05 + state.experience / 100)
        ),
        canLoseHealth(state,
            (amount) => {
                if (state.health - amount <= 0) {
                    return null;
                }
                state.health = state.health - amount;
            }
        )
    );
};

module.exports = soldier;