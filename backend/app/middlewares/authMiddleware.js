const crypto = require('crypto');
const ApiError = require("../exceptions/api-error");

module.exports = (req, res, next) => {
  try {
    const initData = req.headers["tg-init-data"]
    console.log(initData)
    const isDataValid = verifyInitData(initData);

    if (!isDataValid) {
      return next(ApiError.UnauthorizedError("INVALID_AUTH_DATA"));
    }

    req.initData = urlSearchParamsToObject(initData);
    req.initData.user = JSON.parse(req.initData.user);
    next()
  } catch (error) {
    next(error);
  }
}

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

function urlSearchParamsToObject(urlSearchParamsString) {
  const urlSearchParams = new URLSearchParams(urlSearchParamsString);

  const paramsObject = {};
  urlSearchParams.forEach((value, key) => {
    if (paramsObject[key]) {
      if (Array.isArray(paramsObject[key])) {
        paramsObject[key].push(value);
      } else {
        paramsObject[key] = [paramsObject[key], value];
      }
    } else {
      paramsObject[key] = value;
    }
  });

  return paramsObject;
}

