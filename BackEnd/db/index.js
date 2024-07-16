// this is a database connection for mongoDB
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/paytm"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountsSchema = mongoose.Schema({
  userId: String,
  balance: Number,
});

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountsSchema);

module.exports = {
  User,
  Accounts,
};
