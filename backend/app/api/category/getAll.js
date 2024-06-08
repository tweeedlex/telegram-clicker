const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/category",
  async (req, res, next) => {
    try {
      const { db } = req;
      const categories = await db.Category.find({});
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);