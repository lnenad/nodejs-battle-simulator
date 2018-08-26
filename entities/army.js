const squad = require("./squad");

const army = (name, numSquads) => {
    let squads = [];
    for (let x = 0; x < numSquads; x++) {
        squads.push(squad())
    }

    return {
        name,
        squads
    }
};

module.exports = army;
