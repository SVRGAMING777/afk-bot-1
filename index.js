const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: process.env.SERVER_HOST || 'yourdomain.play.hosting',
        port: parseInt(process.env.SERVER_PORT) || 25565,
        username: 'PlayHostingBot',
        version: false
    });

    bot.on('spawn', () => {
        console.log('Bot successfully joined the server!');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 5000);
    });

    bot.on('end', () => {
        console.log('Disconnected! Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Error encountered: ', err.message));
}

createBot();
