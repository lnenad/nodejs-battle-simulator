

const gameLoop = (update, duration) => {
    const interval = setInterval(function () {
        update(interval);
    }, duration);
};

module.exports = gameLoop;