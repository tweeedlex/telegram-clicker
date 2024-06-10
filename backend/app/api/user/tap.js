const { Router } = require("express");

module.exports = Router({ mergeParams: true }).post(
  "/user/tap",
  async (req, res, next) => {
    try {
      const { initData, user, ApiError } = req;
      const { taps, availableTaps, timestamp } = req.body;

      if (!taps || !availableTaps || !timestamp) {
        return next(ApiError.BadRequest("Some parameters are missing"));
      }

      let requestDate = new Date(timestamp * 1000);
      let now = new Date();
      let difference = Math.abs(requestDate - now);
      if (difference > 10000) {
          return next(ApiError.BadRequest("Unvalid parama"));
      }

      const timeBetweenRequestsInSeconds = Math.trunc(Math.abs((user.last_money_request_timestamp * 1000) - now) / 1000);
      const availableTapsPerSecond = 3;
      const restoredTaps = timeBetweenRequestsInSeconds * availableTapsPerSecond
      let trueTaps = +taps;
      let trueAvailableTaps = availableTaps;
      if (taps > user.availableTaps + +restoredTaps){
        trueTaps = user.availableTaps + +restoredTaps
      }
      if (trueTaps <= 0 || trueAvailableTaps > 1500) {
        trueTaps = 0;
        trueAvailableTaps = 0;
      }
      if (availableTaps == 1500 && timeBetweenRequestsInSeconds > 10){
        trueAvailableTaps = 1500
      } else if(availableTaps < user.availableTaps + +restoredTaps) {
        trueAvailableTaps = availableTaps;
      }

      if (availableTaps == user.availableTaps){
        trueAvailableTaps = availableTaps - trueTaps
      }

      user.money += trueTaps * user.multiplier;
      user.availableTaps = trueAvailableTaps;
      user.last_money_request_timestamp = timestamp;
      user.save()

      let responseData = {
        taps: {
          taps: trueTaps,
          availableTaps: +availableTaps,
          creditedMoney: trueTaps * user.multiplier,
          timestamp: timestamp
        },
        user: user,
      }
      return res.json(responseData)
    } catch (error) {
      next(error);
    }
  }
);