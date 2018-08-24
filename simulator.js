const army = require("./entities/army");

const simulate = () => {
    const theArmy = army();

    let x = 0;
    while (theArmy.squads[x]) {
        let y = 0;
        while (theArmy.squads[x].units[y]) {
            const unit = theArmy.squads[x].units[y],
                damage = unit.doDamage();

            if (damage > 0) {
                unit.experience++;
            }

            console.log("Unit does damage: ", damage);
            y++;
        }
        x++;
    }

};

module.exports = {simulate};