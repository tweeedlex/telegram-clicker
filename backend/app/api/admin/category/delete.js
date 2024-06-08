const { Router } = require("express");

module.exports = Router({ mergeParams: true }).delete(
  "/admin/category",
  async (req, res, next) => {
    try {
      const { id } = req.body;
      console.log(id)
      const { db, ApiError } = req;

      if (!id) {
        return ApiError.BadRequest("Category id is required");
      }

      const deletedCategory = await db.Category.findOneAndDelete({ _id: id });
      return res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);