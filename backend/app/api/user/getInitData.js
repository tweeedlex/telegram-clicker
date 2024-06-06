const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/user",
  async (req, res, next) => {
    try {
      return res.json(req.initData);
    } catch (error) {
      next(error);
    }
  }
);