const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const encPassword = await bcrypt.hash(
        password,
        Number(process.env.NUMBER)
      );
      const user = await User.create({
        email,
        password: encPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User was created",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `User could not register: error: ${err}` });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid");
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User was logged",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },
  async list(req, res) {
    try {
      const users = await User.find().populate("listsFavs", "name");
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "Users not found" });
    }
  },
  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
