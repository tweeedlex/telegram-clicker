const { Router } = require("express");
const gameVariables = require("../../../consts/gameVariables");

module.exports = Router({ mergeParams: true }).get(
  "/user/refs",
  async (req, res, next) => {
    try {
      const { user, db } = req;
      const referrals = await db.User.find({ from: user.id });
      return res.json(referrals);
    } catch (error) {
      next(error);
    }
  }
);

