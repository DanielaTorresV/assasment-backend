const { connect } = require("./db");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 8080;
connect();

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
