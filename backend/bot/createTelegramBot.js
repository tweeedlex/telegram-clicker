const { Telegraf, Markup } = require('telegraf');
const WEB_APP_URL = process.env.WEB_APP_URL

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
                                url: WEB_APP_URL
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
