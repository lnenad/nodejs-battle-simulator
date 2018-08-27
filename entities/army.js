const squad = require("./squad");

const army = (name, squadsData) => {
    let squads = [];
    for (let x = 0; x < squadsData.length; x++) {
        squads.push(squad(squadsData[x].units))
    }

    return {
        name,
        squads,
        increaseRecharge: function(amount) {
            this.squads.forEach(squad => {
                squad.increaseRecharge(amount);
            })
        }
    }
};

module.exports = army;
