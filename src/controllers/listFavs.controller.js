const ListFavs = require("../models/listFavs.model");
const User = require("../models/user.model");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const listFavs = await ListFavs.find({ user: userId })
        .populate("user", "email")
        .populate("favs", "title");
      res.status(200).json({ message: "Lists Favs found", data: listFavs });
    } catch (err) {
      res.status(404).json({ message: "Lists Favs not found" });
    }
  },

  async show(req, res) {
    try {
      const { listFavsId } = req.params;
      const listFavs = await ListFavs.findById(listFavsId)
        .populate("user", "email")
        .populate("favs", "title");
      res.status(200).json({ message: "List Favs found", data: listFavs });
    } catch (err) {
      res.status(404).json({ message: "List Favs not found" });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const listFavs = await ListFavs.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.listsFavs.push(listFavs);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "List Favs created", data: listFavs });
    } catch (err) {
      res
        .status(400)
        .json({ message: "List Favs could not be created", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { listFavsId } = req.params;
      const listFavs = await ListFavs.findByIdAndDelete(listFavsId);
      res.status(200).json({ message: "List Favs destroyed", data: listFavs });
    } catch (err) {
      res
        .status(400)
        .json({ message: "List Favs could not be destroyed", data: err });
    }
  },
};
