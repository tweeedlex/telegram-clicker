const ApiError = require("../exceptions/api-error.js");

module.exports = async (req, res, next) => {
  try {
    const {user} = req

    if (user.roles.includes("ADMIN")) {
      return next()
    } else {
      return next(ApiError.Forbidden("User is restricted to access this route"))
    }
  } catch (error) {
    next(error);
  }
}
