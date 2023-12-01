const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 10,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Valid Email required ",
      ],
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.statics.isEmailTaken = async (email) => {
  const result = await this.findOne({ email });
  console.log({ result });
};

const usersModel = mongoose.model("user_details", usersSchema);
module.exports = { usersModel };
