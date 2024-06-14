const { Router } = require("express");
const Hashids = require('hashids')
const hashids = new Hashids(process.env.HASHIDS_TOKEN, 10)

module.exports = Router({ mergeParams: true }).get(
  "/user",
  async (req, res, next) => {
    try {
      let { initData, user } = req;
      let encodedId = hashids.encode(user.id);
      initData.refURL = `https://t.me/${process.env.BOT_USERNAME}?start=${encodedId}`;
      initData.user = user;
      return res.json(initData);
    } catch (error) {
      next(error);
    }
  }
);