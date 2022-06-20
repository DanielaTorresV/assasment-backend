const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const listFavsRouter = require("./routes/listFavs");
const favRouter = require("./routes/fav");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/listsFavs", listFavsRouter);
app.use("/favs", favRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello world from App");
});

module.exports = app;
