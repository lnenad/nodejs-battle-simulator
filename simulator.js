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

const simulate = (strategy, tickDuration) => {
    strategy = 0;
    let armies = [army("USA", 3), army("China", 2), army("GLA", 4)];


    gameLoop((interval) => {
        const victory = () => {
            clearInterval(interval);
            console.log("Victory for army: " + fullState(armies));
        };

        let attackTurn = 0, remainingEnemies = true, attackers, defenders;

        while (remainingEnemies) {
            if (armies.length === 1) {
                victory();
                break;
            }

            const copy = armies.slice();
            copy.splice(attackTurn, 1);

            const defenderArmyIndex = random(0, copy.length-1);

            let x = 0;
            attackers = armies[attackTurn];
            defenders = copy[defenderArmyIndex];

            while (x < attackers.squads.length) {
                //console.log("attackers: ", attackers, "defenders:", defenders);

                const attackersSquadAttackStr = attackers.squads[x].getAttackStr();
                let defenderSquadIndex, defendersSquadAttackStr;

                if (defenders.squads.length === 0) {
                    break;
                }

                if (strategy === 0) {
                    defenderSquadIndex = random(0, defenders.squads.length - 1);
                    defendersSquadAttackStr = defenders.squads[defenderSquadIndex].getAttackStr();
                }
                if (attackersSquadAttackStr > defendersSquadAttackStr) {
                    const damage = attackers.squads[x].getAttackDamage();
                    console.log("Unit from army: ", attackers ,", with: " +
                        attackers.squads[x].getAvgExperience()+ " experience has performed a " +
                        "successful attack on army: ", defenders ," with attack str: " + attackersSquadAttackStr + " and did " + damage + "damage");

                    attackers.squads[x].gainedExperience(1);
                    defenders.squads[defenderSquadIndex].losesHealth(damage);
                }

                if (defenders.squads[defenderSquadIndex].units.length === 0) {
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

            attackTurn = attackTurn === armies.length - 1 ? 0 : attackTurn + 1;
        }
    });

    log(fullState(armies));
};

module.exports = {simulate};