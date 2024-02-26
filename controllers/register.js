const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../logger");

exports.form = (req, res) => {
  res.render("registerForm", { title: "Register" });
};

exports.submit = (req, res, next) => {
  User.findByEmail(req.body.email, (error, user) => {
    if (error) return next(error);
    if (user) {
      console.log("Такой пользователь в базе уже существует");
      res.redirect("/");
    } else {
      User.create(req.body, (err) => {
        if (err) return next(err);
        req.session.userEmail = req.body.email;
        req.session.userName = req.body.name;
        res.redirect("/");
      });
    }

    const token = jwt.sign(
      {
        name: req.body.name,
      },
      process.env.JWTTOCENSECRET || "aboba",
      {
        expiresIn: 60 * 60,
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60,
    });
    logger.info("Токен подготовлен: " + token);
    // Добавляем токен в ответ

    res.redirect("/");
  });
};
