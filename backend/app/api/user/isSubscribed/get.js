const {Router} = require("express");
const {Telegraf} = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const CHANNEL_ID = process.env.CHANNEL_ID;

module.exports = Router({mergeParams: true}).get(
  "/user/isSubscribed",

  // does not work properly because of the bot.telegram.getChatMember method

  async (req, res, next) => {
    try {
      const {user, db} = req;
      const isSubscribed = isUserSubscribed(user.id);
      return res.json({isSubscribed});
    } catch (error) {
      next(error);
    }
  }
);

async function isUserSubscribed(userId) {
  try {
    const chatMember = await bot.telegram.getChatMember(CHANNEL_ID, userId);
    return ['member', 'administrator', 'creator'].includes(chatMember.status);
  } catch (error) {
    console.error('Error fetching chat member:', error);
    return false;
  }
}