const {Router} = require("express");
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;

module.exports = Router({mergeParams: true}).get(
  "/user/isSubscribed",

  async (req, res, next) => {
    try {
      const {user, db} = req;
      const subscriber = await db.Subscriber.findOne({userId: user.id});
      const isSubscribed = !!subscriber;
      return res.json({isSubscribed, date: subscriber.date});
    } catch (error) {
      next(error);
    }
  }
);
