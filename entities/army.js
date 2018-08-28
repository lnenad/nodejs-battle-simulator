const squad = require("./squad"),
    sumReducer = require("../utils").sumReducer;

const army = (name, squadsData) => {
    let squads = [];
    for (let x = 0; x < squadsData.length; x++) {
        squads.push(squad(squadsData[x].units))
    }

    return {
        name,
        squads,
        increaseRecharge: (amount) => {
            squads.forEach(squad => {
                squad.increaseRecharge(amount);
            })
        },
        getWeakestSquadIndex: () => {
            let weakest = {
                idx: -1,
                sum: null
            };

            squads.forEach((squad, i) => {
                const squadHealth = squad.units.map(unit => unit.getHealth()).reduce(sumReducer, 0),
                    experience = squad.getAvgExperience(),
                    numberOfUnits = squad.units.length,
                    dmg = squad.getAttackDamage(),
                    sum = squadHealth + experience + numberOfUnits + dmg;

                if (weakest.sum === null || sum < weakest.sum) {
                    weakest.idx = i;
                    weakest.sum = sum;
                }
            });

            return weakest.idx;
        },
        getStrongestSquadIndex: () => {
            let weakest = {
                idx: -1,
                sum: null
            };

            squads.forEach((squad, i) => {
                const squadHealth = squad.units.map(unit => unit.getHealth()).reduce(sumReducer, 0),
                    experience = squad.getAvgExperience(),
                    numberOfUnits = squad.units.length,
                    dmg = squad.getAttackDamage(),
                    sum = squadHealth + experience + numberOfUnits + dmg;

                if (weakest.sum === null || sum > weakest.sum) {
                    weakest.idx = i;
                    weakest.sum = sum;
                }
            });

            return weakest.idx;
        }
    }
};

module.exports = army;
