const { Telegraf, Markup } = require('telegraf');
const Hashids = require('hashids')
const hashids = new Hashids(process.env.HASHIDS_TOKEN, 10)

const WEB_APP_URL = process.env.WEB_APP_URL

function createTelegramBot() {
    const createTelegramBot = new Telegraf(process.env.BOT_TOKEN);
    const replyWithWebApp = (ctx, fromCommand=false) => {
        let fromUrlParam = ''
        if (fromCommand) {
            let from = ctx.text.split(' ')[1]
            if (from) {
                let decoded = hashids.decode(from)
                if (decoded[0]) {
                    fromUrlParam = `?from=${decoded[0]}`
                }
            }
        }
        ctx.reply('Welcome! Click the button below to open the web app:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Web App',
                            web_app: {
                                url: WEB_APP_URL + fromUrlParam
                            }
                        }
                    ]
                ]
            }
        })
    }

    createTelegramBot.start((ctx) => replyWithWebApp(ctx, true));
    createTelegramBot.on('message', (ctx) => replyWithWebApp(ctx));
    createTelegramBot.launch().then(() => {
        console.log('Bot is running');
    });

    process.once('SIGINT', () => createTelegramBot.stop('SIGINT'));
    process.once('SIGTERM', () => createTelegramBot.stop('SIGTERM'));
}

module.exports = createTelegramBot;
