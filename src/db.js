const mongoose = require("mongoose");

function connect() {
  const url = process.env.NOTHING_HERE;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(url, opts);

  mongoose.connection.once("open", () => {
    console.log("Connection established successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Something went wrong", err);
  });
}

module.exports = { connect };
