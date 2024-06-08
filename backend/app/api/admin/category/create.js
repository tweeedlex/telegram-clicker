const { Router } = require("express");

module.exports = Router({ mergeParams: true }).post(
  "/admin/category",
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const { db, ApiError } = req;

      if (!name) {
        return ApiError.BadRequest("Category name is required");
      }

      const newCategory = await db.Category.create({ name });
      return res.json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);