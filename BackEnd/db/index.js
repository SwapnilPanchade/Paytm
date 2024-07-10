// this is a database connection for mongoDB
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/paytm"
);

const user = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const users = mongoose.model("paytm", user);

module.exports = {
  users,
};
