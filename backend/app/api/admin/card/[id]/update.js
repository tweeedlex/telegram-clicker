const { Router } = require("express");
const uuid = require("uuid");
const fs = require("fs");
const path = require('node:path');

module.exports = Router({ mergeParams: true }).put(
  "/admin/card/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, initialPrice, initialIncome, categoryId, maxLevel, referralsRequired } = req.body;
      const { db, ApiError } = req;

      const card = await db.Card.findOne({_id: id});
      if (!card) {
        return ApiError.NotFound("Card not found");
      }

      // If an image file is uploaded
      let imgName = card.img;
      if (req.files?.img) {
        const img = req.files.img;
        const extension = img.name.split(".")[1];
        imgName = `${uuid.v4()}.${extension}`;
        const imgFolder = path.resolve(`${__dirname}/../../../../public/img/`);
        const imgPath = `${imgFolder}${imgName}`;

        // Make directory if not exist
        if (!fs.existsSync(imgFolder)) {
          fs.mkdirSync(imgFolder);
        }

        await img.mv(imgPath);

        // Delete the old image file
        const oldImgPath = `${imgFolder}${card.img}`;
        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      }

      // Update card details
      await card.update({
        name,
        img: imgName,
        initialPrice,
        initialIncome,
        categoryId,
        maxLevel: maxLevel || 0,
        referralsRequired: referralsRequired || 0
      });

      return res.json(card);
    } catch (error) {
      next(error);
    }
  }
);