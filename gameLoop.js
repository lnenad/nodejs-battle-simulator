const gameLoop = (update, tickDuration) => {

    let timeout,
        stopFunc = () => {
            setTimeout(() => {
                clearTimeout(timeout);
            }, 0);
        };

    const tick = () => {
        const start = Date.now();

        update(stopFunc);

        // Offset for update function time
        const realDuration = tickDuration - (Date.now() - start);

        timeout = setTimeout(tick, realDuration);
        stopFunc = () => {
            setTimeout(() => {
                clearTimeout(timeout);
            }, 0);
        };
    };

    tick();
};

module.exports = gameLoop;