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
      signed: true,
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
    // console.log("gell All Users", result);
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
  const token = req.signedCookies;
  console.log({ token });
  res.json(token);
};

const verifyUser = async (req, res) => {
  try {
    const result = await UserInstance.verifyUser(req.body);
    const token = await UserInstance.generateJwtToken(req.body.username);
    // console.log("VerifyUser");
    // console.log("VerifyUser", result, req.signedCookies.token);

    switch (result) {
      case true: {
        res.cookie("token", token, {
          signed: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        return res.json({ verified: true, token: req.signedCookies });
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
    res.status(500).json({ e: e.message });
  }
};

const clearToken = async (req, res) => {
  // const cookie = req.cookies.token;
  // res.json({ cookie });

  res.cookie("token", "", {
    httpOnly: true,
    signed: true,
    maxAge: 0,
  });
  res.json({ cookies: req.signedCookies });
};

const setToken = async (req, res) => {
  const token = UserInstance.generateJwtToken(req.body.username);
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    signed: true,
  });
  // console.log(res.signedCookies.token);

  res.json({ message: "token Set" });
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUserById,
  verifyUser,
  getToken,
  clearToken,
  setToken,
};
