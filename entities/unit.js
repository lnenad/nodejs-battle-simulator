const random = require("../utils").random,
    sumReducer = require("../utils").sumReducer;

const unit = (type, health, recharge, experience) => {
    health = health || 100;
    recharge = recharge || random(100, 2000);
    experience = experience || 0;

    return {
        health, recharge, experience, type,
        getHealth: function () {
            return this.health;
        },
        setRecharge: function (amount) {
            return this.recharge = amount;
        },
        getRecharge: function () {
            return this.recharge;
        },
        setExperience: function (amount) {
            return this.experience = amount;
        },
        getExperience: function () {
            return this.experience;
        },
    }
};

const canDoDamage = (state, attackStr, attackDamage, canAttack) => {
    return {
        getAttackStr: attackStr,
        getAttackDamage: attackDamage,
        canAttack
    }
};

const canLoseHealth = (state, loseHealth, isDead) => {
    return {
        loseHealth,
        isDead
    }
};

const hasOperators = (state, operators) => {
    return {
        operators,
        getOperatorsHealth: () => {
            return operators.reduce(sumReducer, 0);
        }
    }
};

module.exports = {unit, canDoDamage, canLoseHealth, hasOperators};