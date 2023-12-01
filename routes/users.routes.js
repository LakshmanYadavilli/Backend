const router = require("express").Router();
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
} = require("../controllers/users.controller");
const passport = require("passport");
const authenticationMiddleware = passport.authenticate("jwt", {
  session: false,
});
const middleware = validateSchema(usersSchema);
console.log("User Routes");

router.get("/", getAllUsers);
router.get("/token", getToken);
router.get("/clear-token", clearToken);
router.post("/login", verifyUser);
// router.post("/existed",isUserExisted,);
router.get("/:id", getUserById);
router.post("/new", middleware, isUserExisted, addUser);
router.patch("/update/:id", updateUserById);

module.exports = router;
