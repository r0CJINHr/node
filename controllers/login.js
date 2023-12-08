const User = require("../models/user");

exports.form = (req, res) => {
  res.render("login", { title: "Log In" });
};
