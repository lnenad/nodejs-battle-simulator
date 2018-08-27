const gavg = require("../utils").gavg,
    soldier = require("./soldier"),
    vehicle = require("./vehicle"),
    log = require("../utils").log,
    fullState = require("../utils").fullState;

const squad = (squadData) => {
    let units = [];

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
        getAttackStr: function () {
            return gavg(this.units.map(unit => unit.getAttackStr()));
        },
        getAttackDamage: function () {
            return this.units.map(unit => unit.getAttackDamage()).reduce((sum, str) => {sum += str; return sum}, 0)
        },
        gainedExperience: function (amount) {
            return this.units.forEach(unit => unit.setExperience(unit.getExperience() + amount));
        },
        getAvgExperience: function () {
            return this.units.reduce((sum, unit) => {sum += unit.getExperience(); return sum}, 0) / this.units.length
        },
        canAttack: function () {
            return this.units.every(unit => unit.canAttack())
        },
        resetRecharge: function (amount) {
            return this.units.forEach(unit => unit.setRecharge(amount || 0));
        },
        increaseRecharge: function (amount) {
            return this.units.forEach(unit => unit.setRecharge(unit.getRecharge() + amount));
        },
        losesHealth: function (amount) {
            amount = amount / this.units.length;
            for (let x = 0; x < this.units.length; x++) {
                const unit = this.units[x];

                unit.loseHealth(amount);

                if (unit.isDead()) {
                    log("A unit disappears from the battlefield: " + fullState(this.units[x]));
                    this.units.splice(x, 1);
                }
            }
        },
        units: units
    }
};

module.exports = squad;