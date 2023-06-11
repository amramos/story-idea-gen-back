import express from "express";
import configureApp from "./config/configureApp.mjs";
import initializeDB from "./config/db.initialize.mjs";
import db from "./config/db.connection.mjs";
import "./config/loadEnvironment.mjs";

var app = express();
app = configureApp(app);

initializeDB(db);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});