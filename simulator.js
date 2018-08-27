const army = require("./entities/army"),
    random = require("./utils").random,
    gameLoop = require("./gameLoop"),
    util = require('util'),
    fs = require("fs");

const battleLog = fs.openSync("battle-log.log", "w"),
    fullState = (object) => {
        return util.inspect(object, false, null)
    },
    log = ((message) => {
        fs.writeSync(battleLog, message + "\n");
    });

const simulate = (strategy, tickDuration, fastGame, armies) => {
    armies = armies.map(item => {
        console.log("SKVAD", item.squads);
        return army(item.name, item.squads);
    });

    console.log(fullState(armies));

    let attackers, defenders;

    gameLoop((stop) => {
        const victory = () => {
            stop();
            console.log("Victory for army: " + fullState(armies));
        };

        if (armies.length === 1) {
            return victory();
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
                let defenderSquadIndex, defendersSquadAttackStr;

                if (defenders.squads.length === 0) {
                    break;
                }

                if (strategy === 0) {
                    defenderSquadIndex = random(0, defenders.squads.length - 1);
                    defendersSquadAttackStr = defenders.squads[defenderSquadIndex].getAttackStr();
                }
                if (attackersSquadAttackStr > defendersSquadAttackStr && attackers.squads[x].canAttack()) {
                    const damage = attackers.squads[x].getAttackDamage();
                    console.log("Squad from army: ", attackers.name, ", with: " +
                        attackers.squads[x].getAvgExperience() + " avg experience has performed a " +
                        "successful attack on army: ", defenders.name, " with attack str: " + attackersSquadAttackStr + " and did " + damage + "damage");

                    attackers.squads[x].gainedExperience(1);
                    attackers.squads[x].resetRecharge(0);
                    defenders.squads[defenderSquadIndex].losesHealth(damage);
                } else {
                    console.log("Unable to attack: ", attackers.name, defenders.name, attackersSquadAttackStr > defendersSquadAttackStr, attackers.squads[x].canAttack())
                }

                if (defenders.squads[defenderSquadIndex].units.length === 0) {
                    log("A squad has disappeared from the battlefield: " + fullState(defenders));
                    defenders.squads.splice(defenderSquadIndex, 1);
                }

                //console.log("Squad: ", attackersSquadAttackStr);
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

    log(fullState(armies));
};

module.exports = {simulate};