const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const app = express();
module.exports = app;


// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(volleyball);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use('/api'), require('/api');

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(400).end();
  } else {
    next();
  }
});



