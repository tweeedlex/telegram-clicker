const { Router } = require("express");
const crypto = require('crypto');

module.exports = Router({ mergeParams: true }).get(
  "/user/validate",
  async (req, res, next) => {
    try {
      const initData = req.headers["tg-init-data"]
      const isDataValid = verifyInitData(initData);

      if (isDataValid) {
        return res.json(initData)
      }
      return res.status(400).json({message: "INVALID_DATA"});
    } catch (error) {
      next(error);
    }
  }
);

const verifyInitData = (initData) => {
  const urlParams = new URLSearchParams(initData);

  const hash = urlParams.get('hash');
  urlParams.delete('hash');
  urlParams.sort();

  let dataCheckString = '';
  for (const [key, value] of urlParams.entries()) {
    dataCheckString += `${key}=${value}\n`;
  }
  dataCheckString = dataCheckString.slice(0, -1);

  const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN ?? '');
  const calculatedHash = crypto.createHmac('sha256', secret.digest()).update(dataCheckString).digest('hex');

  return calculatedHash === hash;
}