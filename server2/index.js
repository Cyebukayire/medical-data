/* @author Peace
   created: 19th Aug 2022*/

const express = require("express");
const env = require("dotenv");
const { Data } = require("./controller");
const { isUserAuthenicated } = require("./middleware");
const cors = require("cors");

// Server PORT
env.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

// Create APIs
app.get("/api", (req, res) => {
  res.send("Welcome to medical-data app");
});
app.post("/api/v1/data", isUserAuthenicated, Data);

// Listen to Server PORT
app.listen(port, () => console.log(`The server is listening on PORT ${port}`));

module.exports = app;
