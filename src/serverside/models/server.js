import express from "express";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import React from "react";
import ReactDOMServer from "react-dom/server.js";
import { App } from "../../App.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Server {
  constructor() {
    this.app = express();
    this.port = 3010;
    this.middlewares();
    this.listen();
  }
  middlewares() {
    this.app.get(
      /\.(js|css|map|ico|png)$/,
      express.static(path.resolve(__dirname, "../../../", "public"))
    );
    this.reactSSR();
    // this.app.use(express.static(path.resolve()))
  }
  reactSSR() {
    this.app.use("*", (req, res) => {
      fs.readFile(
        path.resolve(__dirname, "../../../", "public/index.html"),
        "utf-8",
        (err, data) => {
          const markUpReactApp = ReactDOMServer.renderToString(<App />);
          data = data.replace(
            '<div id="app"></div>',
            `<div id="app">${markUpReactApp}</div>`
          );
          res.contentType("text/html");
          res.status(200);
          return res.send(data);
        }
      );
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}
