const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
  "/card",
  async (req, res, next) => {
    try {
      const { db } = req;
      const { categoryId } = req.query;
      let cards;

      const userCards = await db.UserCard.find({ userId: req.user._id });
      if (categoryId) {
        cards = await db.Card.find({ categoryId });
      } else {
        cards = await db.Card.find({});
      }
      cards = cards.map((card) => {
        const userCard = userCards.find((userCard) => userCard.cardId.equals(card._id));
        if (userCard) {
          card = card.toObject();
          card.userCard = userCard;
        }
        return card;
      });
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }
);