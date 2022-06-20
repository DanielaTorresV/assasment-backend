const Fav = require("../models/fav.model");
const ListFavs = require("../models/listFavs.model");

module.exports = {
  async create(req, res) {
    try {
      const { listFavsId } = req.params;
      const fav = await Fav.create({ ...req.body, listFavs: listFavsId });
      const listFavs = await ListFavs.findById(listFavsId);
      listFavs.favs.push(fav);
      listFavs.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Fav created", data: fav });
    } catch (err) {
      res.status(400).json({ message: "Fav could not be created", data: err });
    }
  },

  async show(req, res) {
    try {
      const { favId } = req.params;
      const fav = await Fav.findById(favId)
        .populate("listFavs", "name")
        .populate("user", "email");
      res.status(200).json({ message: "Fav found", data: fav });
    } catch (err) {
      res.status(404).json({ message: "Fav not found" });
    }
  },

  async destroy(req, res) {
    try {
      const { favId } = req.params;
      const fav = await Fav.findByIdAndDelete(favId);
      res.status(200).json({ message: "Fav destroyed", data: fav });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Fav could not be destroyed", data: err });
    }
  },
};
