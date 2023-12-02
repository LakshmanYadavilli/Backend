const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users.routes");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);
mongoose.connect("mongodb://localhost:27017/customers");
app.use(express.json());
app.use(cookieParser("secret"));
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use("/user", usersRoutes);
app.listen(port, () => {
  console.log("Server Listening on port ", port);
});
