const { Router } = require("express");
const gameVariables = require("../../../consts/gameVariables");

module.exports = Router({ mergeParams: true }).post(
  "/user/money",
  async (req, res, next) => {
    try {
      const { user, ApiError, db } = req;
      const { money } = req.body;

      if (!money && money !== 0) {
        return next(ApiError.BadRequest("Money is required"));
      }

      const now = new Date();
      const timeBetweenRequests = Math.trunc(Math.abs(user.last_money_request_timestamp - now));
      const restoredTaps = calculateRestoredTaps(timeBetweenRequests);
      const { validTaps, newAvailableTaps } = calculateValidTaps(user, money, restoredTaps);

      const totalIncomePerHour = await calculateTotalIncomePerHour(db, user._id);
      const incomePerMissingTime = calculateIncomePerMissingTime(totalIncomePerHour, timeBetweenRequests);

      let updatedMoney = Math.trunc(user.money + validTaps * user.level + incomePerMissingTime);

      let newLevel = determineLevel(updatedMoney, gameVariables.MONEY_FOR_LEVELS);

      if (newLevel < user.level) {
        newLevel = user.level;
      }

      const updatedUser = await updateUser(db, user.id, {
        money: updatedMoney,
        availableTaps: Math.trunc(newAvailableTaps),
        last_money_request_timestamp: now,
        level: newLevel
      });

      updatedUser._doc.income_per_hour_by_cards = totalIncomePerHour;
      return res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

function calculateRestoredTaps(timeBetweenRequests) {
  let restoredTaps = (timeBetweenRequests / gameVariables.ENERGY_RECOVERY_INTERVAL) * gameVariables.ENERGY_RECOVERY;
  return Math.min(restoredTaps, gameVariables.ENERGY_LIMIT);
}

function calculateValidTaps(user, money, restoredTaps) {
  const moneyDifference = money - user.money;
  const taps = Math.trunc(moneyDifference / user.level);
  let validTaps = Math.min(taps, user.availableTaps + restoredTaps);

  let newAvailableTaps = user.availableTaps + restoredTaps - validTaps;
  newAvailableTaps = Math.min(newAvailableTaps, gameVariables.ENERGY_LIMIT);

  return { validTaps, newAvailableTaps };
}

async function calculateTotalIncomePerHour(db, userId) {
  const cards = await db.Card.find({});
  const userCards = await db.UserCard.find({ userId });

  return userCards.reduce((totalIncome, userCard) => {
    const card = cards.find(card => card._id.equals(userCard.cardId));
    const income = card.initialIncome * Math.pow(gameVariables.CARD_INCOME_MULTIPLIER, userCard.level + 1);
    return totalIncome + Math.trunc(income);
  }, 0);
}

function calculateIncomePerMissingTime(totalIncomePerHour, timeBetweenRequests) {
  return Math.trunc((totalIncomePerHour / 3600) * Math.ceil(timeBetweenRequests / 1000));
}

function determineLevel(money, moneyForLevels) {
  let newLevel = 1;
  for (let [level, requiredMoney] of Object.entries(moneyForLevels).reverse()) {
    if (money >= requiredMoney) {
      newLevel = parseInt(level, 10);
      break;
    }
  }
  return newLevel;
}

async function updateUser(db, userId, update) {
  return db.User.findOneAndUpdate(
    { id: userId },
    update,
    { new: true }
  );
}
