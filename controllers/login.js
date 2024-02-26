const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index");
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
      const token = jwt.sign(
        {
          name: req.body.name,
        },
        process.env.JWTTOCENSECRET || "aboba",
        {
          expiresIn: 500000,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 500000,
      });
      logger.info("Токен подготовлен (на странице login): " + token);
      res.redirect("/");
    }
  });
};

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
