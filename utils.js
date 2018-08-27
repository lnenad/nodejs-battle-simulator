const util = require('util'),
    fs = require("fs");

const battleLog = fs.openSync("battle-log.log", "w");

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gavg = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++ ) {
        const val = arr[ i ];
        if ( val <= 0 ) {
            return NaN;
        }
        sum += Math.log( val ) / arr.length;
    }
    return Math.exp( sum );
};

const fullState = (object) => {
    return util.inspect(object, false, null)
};

const log = (message) => {
    fs.writeSync(battleLog, message + "\n");
};

module.exports = {
    random,
    gavg,
    fullState,
    log
};