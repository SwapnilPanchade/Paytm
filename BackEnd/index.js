const express = require("express");
const User = require("./db/index");
const auth = require("/middleware");
const app = express();
const mainRouter = require("./routes/index");

app.use("api/v1", mainRouter);
app.use(cors());
app.use(express.json());

app.listen(3000);
