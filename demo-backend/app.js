"use strict";
const express = require("express");
const request = require("request");
const fs = require("fs");
const bodyparser = require("body-parser");
let data = fs.readFileSync("carData.json", "utf8");
let vehicles = JSON.parse(data);

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/:value", (req, res) => {
  let sorted = [];
  vehicles.forEach((element) => {
    if (element.type === req.params.value) {
      sorted.push(element);
    }
  });
  res.send(JSON.stringify(sorted));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
