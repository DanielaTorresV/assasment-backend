const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const morgan = require("morgan");
require("dotenv").config({});

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
