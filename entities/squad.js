const soldier = require("./soldier");

const squad = () => {
    return {
        getAttackStr: function () {
            return this.units.map(unit => unit.getAttackStr()).reduce((sum, str) => {sum += str; return sum}, 0) / this.units.length
        },
        getAttackDamage: function () {
            return this.units.map(unit => unit.getAttackDamage()).reduce((sum, str) => {sum += str; return sum}, 0)
        },
        gainedExperience: function (amount) {
            return this.units.forEach(unit => unit.experience = unit.experience + amount);
        },
        getAvgExperience: function () {
            return this.units.reduce((sum, unit) => {sum += unit.experience; return sum}, 0) / this.units.length
        },
        canAttack: function () {
            return this.units.every(unit => unit.recharge >= 2000)
        },
        resetRecharge: function () {
            return this.updateRecharge(0);
        },
        updateRecharge: function (amount) {
            return this.units.forEach(unit => unit.recharge = amount);
        },
        losesHealth: function (amount) {
            amount = amount / this.units.length;
            for (let x = 0; x < this.units.length; x++) {
                const unit = this.units[x],
                    dead = unit.loseHealth(amount) === null;

                if (dead) {
                    this.units.splice(x, 1);
                }
            }
        },
        units: [soldier(), soldier()]
    }
};

module.exports = squad;