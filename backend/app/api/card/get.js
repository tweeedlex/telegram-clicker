const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/card",
  async (req, res, next) => {
    try {
      const { db } = req;
      const { categoryId } = req.query;
      let cards;

      if (categoryId) {
        cards = await db.Card.find({ categoryId });
      } else {
        cards = await db.Card.find({})
      }
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }
);