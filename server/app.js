const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(volleyball);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const allScools = (campuses) => `
  <h1>All schools</h1>
  <main>
    ${campuses.map((campus) => {
      return `<section><a id="${campus.name}"></section>`
    })}
  </main>
`;

module.exports = app;
