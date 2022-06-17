const { Schema, model } = require("mongoose");

const listFavsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "ListFavs name is required"],
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
const ListFavs = model("ListFavs", listFavsSchema);
module.exports = ListFavs;
