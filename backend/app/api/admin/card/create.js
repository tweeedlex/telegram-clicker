const { Router } = require("express");
const uuid = require("uuid");

module.exports = Router({ mergeParams: true }).post(
  "/admin/card",
  async (req, res, next) => {
    try {
      const { name, initialPrice, initialIncome } = req.body;
      const { db, ApiError } = req;

      if (!name || !req.files?.img || !initialPrice || !initialIncome) {
        return ApiError.BadRequest("Card name, img, initialPrice, and initialIncome are required");
      }

      const img = req.files.img;
      const extension = img.name.split(".")[1];
      const imgName = `${uuid.v4()}.${extension}`;
      const imgPath = `${__dirname}/../../../public/img/${imgName}`;
      await img.mv(imgPath);

      const newCard = await db.Card.create({ name, img: imgName, initialPrice, initialIncome });
      return res.json(newCard);
    } catch (error) {
      next(error);
    }
  }
);