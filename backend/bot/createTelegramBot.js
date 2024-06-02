const { Telegraf, Markup } = require('telegraf');

function createTelegramBot() {
    const createTelegramBot = new Telegraf(process.env.BOT_TOKEN);

    createTelegramBot.start((ctx) => {
        ctx.reply('Welcome! Click the button below to open the web app:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Web App',
                            web_app: {
                                url: 'https://google.com'
                            }
                        }
                    ]
                ]
            }
        })
    });

    createTelegramBot.launch().then(() => {
        console.log('Bot is running');
    });

    // Enable graceful stop
    process.once('SIGINT', () => createTelegramBot.stop('SIGINT'));
    process.once('SIGTERM', () => createTelegramBot.stop('SIGTERM'));
}

module.exports = createTelegramBot;
