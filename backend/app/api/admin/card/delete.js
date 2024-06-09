const { Router } = require("express");

module.exports = Router({ mergeParams: true }).delete(
  "/admin/category",
  async (req, res, next) => {
    try {
      const { id } = req.body;
      const { db, ApiError } = req;

      if (!id) {
        return ApiError.BadRequest("Card id is required");
      }

      const deletedCard = await db.Card.findOneAndDelete({ _id: id });
      return res.json(deletedCard);
    } catch (error) {
      next(error);
    }
  }
);