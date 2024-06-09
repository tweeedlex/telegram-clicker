const { Router } = require("express");

module.exports = Router({ mergeParams: true }).put(
  "/admin/category",
  async (req, res, next) => {
    try {
      const { id, name } = req.body;
      const { db, ApiError } = req;

      if (!id || !name) {
        return ApiError.BadRequest("Category id and name (new) is required");
      }

      const updatedCategory = await db.Category.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      return res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);