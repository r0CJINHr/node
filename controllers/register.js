const User = require("../models/user");

exports.form = (req, res) => {
  res.render("registerForm", {});
};

exports.submit = (req, res) => {
  User.create(req.body.user, cb);
};
