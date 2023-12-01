const users = require("../users.json");
const User = require("../services/users.services");

const UserInstance = new User();

const addUser = async (req, res) => {
  const { body, query } = req;
  console.log({ body, query });
  try {
    const result = await UserInstance.addNew(req.body);

    const token = await UserInstance.generateJwtToken(req.body.username);
    console.log({ username: req.body.username, token });
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    res.json({ status: true });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await UserInstance.getAll();
    console.log({ username: req.params.username, token });
    // localStorage.setItem("token", token);
    // console.log({ localStorage: localStorage.getItem("token") });

    res.json(result);
  } catch (e) {
    return res.sendStatus(500);
  }
};

const getUserById = (req, res) => {
  UserInstance.getUserById(req.params.id)
    .then((result) => res.json(result))
    .catch((e) => res.status(500).send(e.message));
};

const updateUserById = (req, res) => {
  UserInstance.updateUser({ _id: req.params.id, details: req.body })
    .then((result) => res.json(result))
    .catch((e) => res.sendStatus(500));
};

const getToken = (req, res) => {
  const token = req.signedCookies.token;
  console.log({ token });
  res.send({ token });
};

const verifyUser = async (req, res) => {
  try {
    const result = await UserInstance.verifyUser(req.body);
    // console.log("VerifyUser");
    // console.log("VerifyUser", result);
    const token = UserInstance.generateJwtToken(req.body.username);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    switch (result) {
      case true: {
        return res.json({ verified: true });
      }
      case false: {
        return res.status(403).json({ message: "Password Incorrect" });
      }
      case null: {
        console.log("null");
        return res
          .status(403)
          .json({ message: "User Doesn't Exist Please Signup First" });
      }
      default: {
        break;
      }
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const clearToken = async (req, res) => {
  const cookie = req.cookies.token;
  res.json({ cookie });

  // res
  //   .clearCookie("token", { httpOnly: true })
  //   .json({ message: "Token Cookie Cleared" });
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUserById,
  verifyUser,
  getToken,
  clearToken,
};
