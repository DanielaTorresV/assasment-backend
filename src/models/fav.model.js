const { Schema, model } = require("mongoose");

const favSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Fav title is required"],
    },
    description: {
      type: String,
      required: [true, "Fav description is required"],
    },
    link: {
      type: String,
      required: [true, "Fav link is required"],
    },
    listFavs: {
      type: Schema.Types.ObjectId,
      ref: "ListFavs",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Fav = model("Fav", favSchema);
module.exports = Fav;
