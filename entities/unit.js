const random = require("../utils").random;

const unit = (health, recharge, experience) => {
    health = health || 100;
    recharge = recharge || random(100, 105);
    experience = experience || 0;

    return {
        health, recharge, experience
    }
};

const canDoDamage = (state, attackStr) => {
    return doDamage = () => {
        const damage = 0.05 + state.experience / 100,
            canAttack = attackStr();
        console.log("Can attack: ", canAttack);

        if (canAttack > 0.35) {
            return damage;
        } else {
            return 0;
        }
    };
};

module.exports = {unit, canDoDamage};