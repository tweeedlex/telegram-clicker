const { Router } = require("express");
const gameVariables = require("../../../consts/gameVariables");

module.exports = Router({ mergeParams: true }).post(
  "/card/:cardId",
  async (req, res, next) => {
    try {
      const { db, user, ApiError } = req;
      const { cardId } = req.params;

      const card = await db.Card.findOne({ _id: cardId });
      const userCard = await db.UserCard.findOne({ userId: user._id, cardId });
      const newCardLevel = userCard ? userCard.level + 1 : 1;
      const purchasePrice =  newCardLevel === 1
        ? card.initialPrice
        : card.initialPrice * Math.pow(gameVariables.CARD_UPGRADE_MULTIPLIER, newCardLevel);

      if (user.money <= purchasePrice) {
        return next(ApiError.BadRequest("Not enough money"))
      }

      let newUserCard;
      if (newCardLevel === 1) {
        newUserCard = await db.UserCard.create({
          userId: user._id,
          cardId,
          level: 1,
          purchasePrice,
        });
      } else {
        newUserCard = await db.UserCard.findOneAndUpdate(
          { userId: user._id, cardId },
          { level: newCardLevel, purchasePrice },
          { new: true }
        );
      }

      const updatedUser = await db.User.findOneAndUpdate(
        { _id: user._id },
        { money: user.money - purchasePrice },
        { new: true }
      );
      console.log("logs:", user.money, purchasePrice, updatedUser.money)

      return res.json({newUserCard, user: updatedUser});
    } catch (error) {
      next(error);
    }
  }
);