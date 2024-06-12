const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const apiRouter = require("./api/createApiRouter.js")();
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware.js");
const userDataMiddleware = require("./middlewares/userDataMiddleware.js");
const adminMiddleware = require("./middlewares/adminMiddleware.js");
const ApiError = require("./exceptions/api-error.js")
const fileUpload = require("express-fileupload");

module.exports = ({ database, logger }) =>
  express()
    .use(
      expressWinston.logger({
        winstonInstance: logger,
        msg: "{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms",
        meta: false,
      })
    )
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use((req, res, next) => {
      req.base = `${req.protocol}://${req.get("host")}`;
      req.logger = logger;
      req.db = database;
      req.ApiError = ApiError
      return next();
    })
    .use(
      cors({
        origin: "*",
      })
    )
    .use("/", express.static(__dirname + "/public"))
    .use(authMiddleware)
    .use(userDataMiddleware)
    .use(fileUpload())
    .use("/api/admin", adminMiddleware)
    .use("/api", apiRouter)
    .use((req, res) => res.sendStatus(404))
    .use((error, req, res, next) => {
      logger.error(error);
      return error.status
        ? res.status(400).json(error)
        : res.status(error?.status).json(error?.message);
    });
