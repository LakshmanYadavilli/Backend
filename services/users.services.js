const { usersModel } = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Users {
  addNew = async (data) => {
    console.log({ data });
    const { password } = data;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const check = await bcrypt.compare(password, hashPassword);
    console.log({ check });
    const data1 = { ...data, password: hashPassword };
    const document = new usersModel(data1);
    await document.save();
    return document;
  };
  getAll = async () => {
    return await usersModel.find({});
  };
  getUserById = async (id) => {
    return await usersModel.findById(id);
  };

  updateUser = async (data) => {
    const { _id, details } = data;
    console.log({ data });
    const result = await usersModel.findByIdAndUpdate(_id, details, {
      new: true,
    });
    console.log({ result });
    return result;
  };
  generateJwtToken = (username) => {
    const payload = { username };
    const options = { expiresIn: "30m" };
    const jwtSecret = process.env.JWT_Secret;
    console.log({ jwtSecret });
    const token = jwt.sign(payload, jwtSecret, options);

    return token;
  };
  verifyUser = async (data) => {
    const { username, password } = data;
    console.log({ data });
    const result = await usersModel.findOne({ username });
    console.log("YVL");
    console.log("Verify User Service");
    if (result) {
      const check = bcrypt.compare(password, result.password);
      return check;
    }

    return null;
  };
  isUserExisted = async (username) => {
    console.log("isUserExisted", username);
    const result = await usersModel.findOne({ username });
    if (result) {
      return true;
    }

    return false;
  };
}

module.exports = Users;
