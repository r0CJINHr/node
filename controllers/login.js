const User = require("../models/user");

exports.form = (req, res) => {
  res.render("loginForm", { title: "Log In" });
};

exports.submit = (req, res, next) => {
  User.authentificate(req.body, (error, data) => {
    if (error) return next(error);
    if (!data) {
      console.log("Имя или пароль неверный");
      res.redirect("back");
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      res.redirect("/");
    }
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
