const gavg = require("../utils").gavg,
    soldier = require("./soldier"),
    vehicle = require("./vehicle"),
    sumReducer = require("../utils").sumReducer,
    log = require("../utils").log,
    fullState = require("../utils").fullState;

const squad = (squadData) => {
    let units = [];

    if (squadData.length < 5 || squadData.length > 10) {
        throw new Error("Invalid number of units in squad. The number of units must be between 5 and 10" + fullState(squadData));
    }

    squadData.forEach(unit => {
        switch (unit.type.toLowerCase()) {
            case "soldier":
                units.push(soldier());
                break;
            case "vehicle":
                const operators = unit.operators.map(unit => soldier());
                units.push(vehicle(operators));
                break;
        }
    });

    units.push(vehicle([soldier(), soldier()]));

    return {
        getAttackStr: () => {
            return gavg(units.map(unit => unit.getAttackStr()));
        },
        getAttackDamage: () => {
            return units.map(unit => unit.getAttackDamage()).reduce(sumReducer, 0)
        },
        gainedExperience: (amount) => {
            return units.forEach(unit => unit.setExperience(unit.getExperience() + amount));
        },
        getAvgExperience: () => {
            return units.map(unit => unit.getExperience()).reduce(sumReducer, 0) / units.length
        },
        canAttack: () => {
            return units.every(unit => unit.canAttack())
        },
        resetRecharge: (amount) => {
            return units.forEach(unit => unit.setRecharge(amount || 0));
        },
        increaseRecharge: (amount) => {
            return units.forEach(unit => unit.setRecharge(unit.getRecharge() + amount));
        },
        losesHealth: (amount) => {
            amount = amount / units.length;
            for (let x = 0; x < units.length; x++) {
                const unit = units[x];

                unit.loseHealth(amount);

                if (unit.isDead()) {
                    log("A unit disappears from the battlefield: " + fullState(units[x]));
                    units.splice(x, 1);
                }
            }
        },
        units: units
    }
};

module.exports = squad;