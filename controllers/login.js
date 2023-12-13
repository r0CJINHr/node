const User = require("../models/user");

exports.form = (req, res) => {
  res.render("loginForm", { title: "Log In" });
};

exports.submit = (req, res, next) => {
  User.authenfication(req.body.loginForm, (err, data) => {
    if (err) return next(err);
    if (!data) {
      console.log("email or password incorrect");
      res.redirect("back");
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;

      res.redirect("/a");
    }
  });
};

exports.logout = function (req, res) {
  req.session.destroy((err) => {
    if (err) return next;
  });
};
