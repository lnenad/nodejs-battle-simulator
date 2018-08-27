const random = require("../utils").random,
    gavg = require("../utils").gavg,
    unitMod = require("./unit"),
    unit = unitMod.unit,
    canDoDamage = unitMod.canDoDamage,
    hasOperators = unitMod.hasOperators,
    canLoseHealth = unitMod.canLoseHealth;


const vehicle = (operators) => {
    const state = unit("Vehicle");

    return Object.assign(state,
        hasOperators(state, operators),
        canDoDamage(state,
            () => (0.5 * (1 + state.health/100) * gavg(operators.map(unit => unit.getAttackStr()))),
            () => (0.1 + operators.reduce((sum, unit) => {sum += unit.getExperience(); return sum}, 0) / 100),
            () => state.getRecharge() >= 1000
        ),
        canLoseHealth(state,
            (amount) => {
                const vehicleDmg = amount/(50/100),
                    randomDmg = amount/(30/100),
                    evenDmg = amount/(20/100),
                    randOperatorIndex = random(0, operators.length - 1);

                operators.forEach((unit, i) => {
                    if (i === randOperatorIndex) {
                        return unit.health = unit.getHealth() - randomDmg
                    }

                    unit.health = unit.getHealth() - evenDmg;
                });

                operators = operators.filter(unit => {
                       return unit.getHealth() > 0;
                });

                state.health = state.getHealth() - vehicleDmg;
            },
            () => operators.length === 0 || state.getHealth() <= 0
        )
    );
};

module.exports = vehicle;