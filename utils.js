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

module.exports = {
    random,
    gavg
};