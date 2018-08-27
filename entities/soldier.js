const random = require("../utils").random,
    unitMod = require("./unit"),
    unit = unitMod.unit,
    canDoDamage = unitMod.canDoDamage,
    canLoseHealth = unitMod.canLoseHealth;


const soldier = () => {
    const state = unit("Soldier");

    return Object.assign(state, canDoDamage(state,
            () => (0.5 * (1 + state.health/100) * random(30 + state.experience, 100) / 100),
            () => (0.05 + state.experience / 100),
            () => state.getRecharge() >= 2000,
        ),
        canLoseHealth(state,
            (amount) => state.health = state.getHealth() - amount,
            () => state.getHealth() <= 0
        )
    );
};

module.exports = soldier;