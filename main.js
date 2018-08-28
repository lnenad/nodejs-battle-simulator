const fs = require("fs"),
    toml = require("toml"),
    util = require('util'),
    simulator = require("./simulator");

const configurationFile = fs.readFileSync("config.toml");
const configuration = toml.parse(configurationFile);

//console.log(util.inspect(configuration, false, null));

if (configuration.main === undefined || configuration.main.tickDuration === undefined || configuration.main.attackStrategy === undefined) {
    throw new Error("Invalid main configuration provided.");
}
if (!configuration.armies || configuration.armies.length < 2) {
    throw new Error("Invalid army configuration provided");
}

simulator.simulate(
    configuration.main.attackStrategy,
    configuration.main.tickDuration,
    configuration.main.fastGame,
    configuration.armies
);