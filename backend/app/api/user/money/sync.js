const {Router} = require("express");
const gameVariables = require("../../../consts/gameVariables");

module.exports = Router({mergeParams: true}).post(
  "/user/money",
  async (req, res, next) => {
    try {
      const {user, ApiError, db} = req;
      const {money} = req.body;

      if (!money && money !== 0) {
        return next(ApiError.BadRequest("Money is required"));
      }

      let now = new Date();
      const timeBetweenRequests = Math.trunc(Math.abs((user.last_money_request_timestamp) - now));
      let restoredTaps = (timeBetweenRequests / gameVariables.ENERGY_RECOVERY_INTERVAL) * gameVariables.ENERGY_RECOVERY;

      if (restoredTaps > gameVariables.ENERGY_LIMIT) {
        restoredTaps = gameVariables.ENERGY_LIMIT;
      }

      const moneyDifference = money - user.money;
      const taps = Math.trunc(moneyDifference / user.multiplier);
      let validTaps = taps;

      if (taps > user.availableTaps + restoredTaps) {
        validTaps = user.availableTaps + restoredTaps;
      }

      let newAvailableTaps = user.availableTaps + restoredTaps - validTaps;
      if (newAvailableTaps > gameVariables.ENERGY_LIMIT) {
        newAvailableTaps = gameVariables.ENERGY_LIMIT;
      }
      let userCards = await db.UserCard.find({userId: user._id})
      let totalIncomePerHour = 0;
      for(var i = 0; i < userCards.length; i++){
        let card = await db.Card.findById(userCards[i].cardId)
        let income = card.initialIncome * Math.pow(gameVariables.CARD_INCOME_MULTIPLIER, userCards[i].level + 1)
        totalIncomePerHour += Math.trunc(income);
      }
      let incomePerMissingTime = Math.trunc((totalIncomePerHour / 3600) * Math.ceil(timeBetweenRequests / 1000))
      let updatedUser = await db.User.findOneAndUpdate(
        {id: user.id},
        {
          money: Math.trunc(user.money + validTaps * user.multiplier + incomePerMissingTime),
          availableTaps: Math.trunc(newAvailableTaps),
          last_money_request_timestamp: now
        },
        {new: true}
      );
      uUser = {}
      uUser.income_per_hour_by_cards = totalIncomePerHour;
      return res.json(Object.assign(uUser, updatedUser._doc));
    } catch (error) {
      next(error);
    }
  }
);
