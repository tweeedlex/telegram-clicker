const { Router } = require("express");

module.exports = Router({ mergeParams: true }).delete(
  "/admin/card/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
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