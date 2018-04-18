"use strict";

const { ipcRenderer } = require("electron");

window.onload = function () {
  document.querySelector("#bottone").addEventListener("click", function () {
    ipcRenderer.send("get_ok");
  });

  ipcRenderer.on("scrivi_get_ok", function() {
    console.log("RICEVUTO SCRIVI GET OK");
  });
}