const Users = require("../services/users.services");
const UsersInstance = new Users();
const isUserExisted = async (req, res, next) => {
  const result = await UsersInstance.isUserExisted(req.body.username);
  console.log("isUser", result);
  if (result) {
    return res
      .status(409)
      .json({ message: "User Already Existed", status: false });
  }

  return next();
};

module.exports = isUserExisted;
