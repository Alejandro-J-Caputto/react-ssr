// require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import "./app.scss";

const appHookHTML = document.getElementById("app");
ReactDOM.hydrate(<App />, appHookHTML);