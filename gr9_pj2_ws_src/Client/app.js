const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const route = require("../Client/routing/route")
app.use("/", route);

app.listen(process.env.PORT, (err) => {
  console.log(`listening on ${process.env.PORT}`);
});