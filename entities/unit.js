const random = require("../utils").random;

const unit = (health, recharge, experience) => {
    health = health || 100;
    recharge = recharge || random(100, 105);
    experience = experience || 0;

    return {
        health, recharge, experience
    }
};

const canDoDamage = (state, attackStr, attackDamage) => {
    return {
        getAttackStr: attackStr,
        getAttackDamage: attackDamage
    }
};

const canLoseHealth = (state, loseHealth) => {
    return {
        loseHealth
    }
};

module.exports = {unit, canDoDamage, canLoseHealth};