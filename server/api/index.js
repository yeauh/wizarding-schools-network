"use strict";
const router = require("express").Router();
const db = require("../db/db");

// require your database and place your routes here
// const express = require('express')
const app = router();

const layout = (bodyContent) =>
  `<html><head></head><body>${bodyContent}</body></html>`;

  const allSchools = (school) => `
  <h1>All Schools</h1>
  <main>
    ${school.map((campus) => {
        return `<section><a id="${campus.id}" href="/campus/${campus.id}">${campus.name}</a> is <em>${campus.age}</em> years old</section>`;
      })
      .join("")}
  </main>
`;
app.get('/', (req, res) => {
  res.send('welcome to the main page')
})


app.get("/schools", (req, res) => {
    res.send(layout(allSchools(campus)));
  });
  
  app.get("/schools/:id", (req, res) => {
    const { id } = req.params;
    const campus = campus.find((campus) => parseInt(id) === campus.id);
  
    res.send(layout(singlePerson(campus)));
  });
module.exports = router;
