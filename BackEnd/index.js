const express = require("express");
const User = require("./db/index");
const auth = require("/middleware");

app.use(cors());
app.use(express.json());

const app = express();
const mainRouter = require("./routes/index");

app.use("api/v1", mainRouter);

app.listen(3000);
