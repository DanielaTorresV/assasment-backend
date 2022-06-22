const { Schema, model } = require("mongoose");
const Fav = require("../models/fav.model");

const listFavsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "ListFavs name is required"],
      enum: {
        values: ["Clothes", "Music", "Pets", "Food"],
        message: "It is a invalid name for the list",
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Fav",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

listFavsSchema.pre("findOneAndDelete", async function cascadeOnDelete(next) {
  try {
    const { _id: listFavs } = this.getFilter();
    await Fav.deleteMany({ listFavs });
    next();
  } catch (err) {
    next(err);
  }
});

const ListFavs = model("ListFavs", listFavsSchema);
module.exports = ListFavs;
