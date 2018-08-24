const squad = require("./squad");

const army = () => {
    return {
        squads: [squad(), squad()]
    }
};

module.exports = army;
