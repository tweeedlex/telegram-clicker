module.exports = async (req, res, next) => {
  try {
    const {initData, db} = req
    const initUserData = initData.user
    let user = await db.User.findOne({id: initUserData.id})
    if (!user) {
      if (req.query.from){
        initUserData.from_user = +req.query.from;
      }
      user = await db.User.create(initUserData)
    }
    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
}
