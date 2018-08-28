const army = require("./entities/army"),
    random = require("./utils").random,
    gameLoop = require("./gameLoop"),
    fs = require("fs"),
    log = require("./utils").log,
    fullState = require("./utils").fullState;

const simulate = (strategy, tickDuration, fastGame, armies) => {
    armies = armies.map(item => {
        return army(item.name, item.squads);
    });

    let attackers, defenders;

    gameLoop((stop) => {
        if (armies.length === 1) {
            console.log("Victory for army: " + armies[0].name);
            return stop();
        }

        let y = 0;

        while (y < armies.length) {
            let x = 0;

            const copy = armies.slice();
            copy.splice(y, 1);

            const defenderArmyIndex = random(0, copy.length-1);

            attackers = armies[y];
            defenders = copy[defenderArmyIndex];

            while (x < attackers.squads.length) {
                const attackersSquadAttackStr = attackers.squads[x].getAttackStr();

                const {defenderSquadIndex, defendersSquadAttackStr} = getDefenderSquadIndexAndAttackStr(strategy, defenders);

                if (attackersSquadAttackStr > defendersSquadAttackStr && attackers.squads[x].canAttack()) {
                    const damage = attackers.squads[x].getAttackDamage();
                    log("Squad from army: " + attackers.name + ", with: " +
                        attackers.squads[x].getAvgExperience() + " avg experience has performed a " +
                        "successful attack on army: ", defenders.name, " with attack str: " + attackersSquadAttackStr + " and did " + damage + " damage");

                    attackers.squads[x].gainedExperience(1);
                    attackers.squads[x].resetRecharge(0);
                    defenders.squads[defenderSquadIndex].losesHealth(damage);
                }

                if (defenders.squads[defenderSquadIndex].units.length === 0) {
                    log("A squad has disappeared from the battlefield: " + fullState(defenders));
                    defenders.squads.splice(defenderSquadIndex, 1);
                }

                if (defenders.squads.length === 0) {
                    break;
                }

                x++;
            }

            if (defenders.squads.length === 0) {
                log("An army has disappeared from the battlefield: " + fullState(defenders));
                copy.splice(defenderArmyIndex, 1);
                copy.push(attackers);
                log("Armies remaining: " + fullState(copy));
                armies = copy;
            }

            y++;
        }

        armies.forEach(army => army.increaseRecharge((fastGame ? (tickDuration * 10) : tickDuration)))
    }, tickDuration);
};

const getDefenderSquadIndexAndAttackStr = (strategy, defenders) => {
    let defenderSquadIndex, defendersSquadAttackStr;

    switch (strategy) {
        case 0:
            defenderSquadIndex = random(0, defenders.squads.length - 1);
            defendersSquadAttackStr = defenders.squads[defenderSquadIndex].getAttackStr();
            break;
        case 1:
            defenderSquadIndex = defenders.getWeakestSquadIndex();
            defendersSquadAttackStr = defenders.squads[defenderSquadIndex].getAttackStr();
            break;
        case 2:
            defenderSquadIndex = defenders.getStrongestSquadIndex();
            defendersSquadAttackStr = defenders.squads[defenderSquadIndex].getAttackStr();
            break;
        default:
            throw new Error("Invalid strategy value provided");
    }

    return {defenderSquadIndex, defendersSquadAttackStr};
};


module.exports = {simulate};