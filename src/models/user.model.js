const { Schema, model, models } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegex = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegex, "Email is not valid"],
      validate: {
        async validator(email) {
          const user = await models.User.findOne({ email });
          return !user;
        },
        message: "Email already exists",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRegex, "Invalid password"],
    },
    listFavs: {
      type: [{ type: Schema.Types.ObjectId, ref: "ListFavs" }],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
