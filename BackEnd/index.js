const express = require("express");
const User = require("./db/index");

const app = express();
const mainRouter = require("./routes/index");

app.use("api/v1", mainRouter);
app.use(cors());
app.use(express.json());
