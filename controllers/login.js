const User = require("../models/user");

exports.form = (req, res) => {
  res.render("loginForm", { title: "Log In" });
};

exports.submit = (req, res, next) => {
  User.authenfication(req.body.loginForm, (err, data) => {
    if (err) return next(err);
    if (!data) return;
    console.log("email or password incorrect");
    res.redirect("back");

    if (data) return;
    {
      req.session.userEmail = data.email;
      req.session.userName = data.name;

      res.redirect("/");
    }
  });
};

exports.logout = function (req, res) {};
