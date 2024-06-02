const { Router } = require("express");

module.exports = Router({ mergeParams: true }).get(
    "/test",
    async (req, res, next) => {
        try {
            const db = req.db;
            const userModel = db.User
            console.log(db);
            userModel.create({username: "tweeedlex"})
            return res.json("success");
        } catch (error) {
            next(error);
        }
    }
);