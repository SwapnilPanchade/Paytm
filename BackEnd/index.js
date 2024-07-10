const express = require("express");
const { paytm } = require("./db");
const cors = require("cors");
const app = express();
const router = require("./routes");

app.use("api/v1", router);
