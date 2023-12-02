const router = require("express").Router();
const cookieParser = require("cookie-parser");
const { validateSchema } = require("../middlewares/validateSchema");
const isUserExisted = require("../middlewares/isUserExisted");

const { usersSchema } = require("../validators/users.validator");
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUserById,
  verifyUser,
  getToken,
  clearToken,
  setToken,
} = require("../controllers/users.controller");
const passport = require("passport");
// const configPassport=require("../config/passport")
const authenticationMiddleware = passport.authenticate("jwt", {
  session: false,
});
// authenticationMiddleware();
// console.log({ authenticationMiddleware });
const middleware = validateSchema(usersSchema);
console.log("User Routes");

router.get("/", authenticationMiddleware, getAllUsers);
router.get("/get", getToken);
router.get("/set", setToken);
router.get("/clear", clearToken);
router.post("/login", verifyUser);
// router.post("/existed",isUserExisted,);
router.get("/:id", getUserById);
router.post("/new", middleware, isUserExisted, addUser);
router.patch("/update/:id", updateUserById);

module.exports = router;
