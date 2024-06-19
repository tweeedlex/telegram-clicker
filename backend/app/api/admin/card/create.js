const { Router } = require("express");
const uuid = require("uuid");
const fs = require("fs");
const path = require('node:path');

module.exports = Router({ mergeParams: true }).post(
  "/admin/card",
  async (req, res, next) => {
    try {
      const { name, initialPrice, initialIncome, categoryId } = req.body;
      const { db, ApiError } = req;
      console.log(name, initialPrice, initialIncome, categoryId)

      if (!name || !req.files?.img || !initialPrice || !initialIncome || !categoryId) {
        return ApiError.BadRequest("Card name, img, initialPrice, categoryId, and initialIncome are required");
      }

      const img = req.files.img;
      const extension = img.name.split(".")[1];
      const imgName = `${uuid.v4()}.${extension}`;
      const imgPath = path.resolve(`${__dirname}/../../../public/img/${imgName}`);

      // make directory if not exist
      if (!fs.existsSync(path.resolve(`${__dirname}/../../../public/img/`))) {
        fs.mkdirSync(path.resolve(`${__dirname}/../../../public/img/`));
      }

      await img.mv(imgPath);

      const newCard = await db.Card.create({ name, img: imgName, initialPrice, initialIncome, categoryId });
      return res.json(newCard);
    } catch (error) {
      next(error);
    }
  }
);