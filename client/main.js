"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const http = require("http");

let finestra;

function creaFinestra() {
  finestra = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  });

  finestra.webContents.openDevTools();

  finestra.loadURL(url.format({
    pathname: path.join(__dirname, "app/index.html"),
    protocol: "file",
    slashes: true
  }));

  finestra.on("closed", function () {
    finestra = null;
  });

  finestra.webContents.on("did-finish-load", function () {
    finestra.show();
  });
}

ipcMain.on("get_ok", function (event) {
  var options = {
    host: 'localhost',
    port: 3001,
    path: '/',
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      //console.log('BODY: ' + chunk);
      event.sender.send("scrivi_get_ok");
    });
  });

  req.end();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (finestra === null) {
    creaFinestra();
  }
});

app.on("ready", creaFinestra);
