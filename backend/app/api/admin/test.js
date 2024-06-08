const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/admin",
  async (req, res, next) => {
    try {
      return res.json("success");
    } catch (error) {
      next(error);
    }
  }
);