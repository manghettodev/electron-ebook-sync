"use strict";

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  console.log("OK INVIATO A CLIENT");
  res.send("OK RICEVUTO DA SERVER");
});

app.listen("3001", function() {
  console.log("ascoltando su 3001");
});