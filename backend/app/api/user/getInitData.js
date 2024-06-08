const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/user",
  async (req, res, next) => {
    try {
      const { initData, user } = req;
      initData.user = user;
      return res.json(initData);
    } catch (error) {
      next(error);
    }
  }
);