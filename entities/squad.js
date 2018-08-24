const soldier = require("./soldier");

console.log(soldier(), soldier());

const squad = () => {
    return {
        units: [soldier(), soldier()]
    }
};

module.exports = squad;