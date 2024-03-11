const User = require("../models/user");
const validate = require("../middleware/validate");
const messanger = "https://kappa.lol/iSONv";
const logger = require("../logger/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.form = (req, res) => {
  logger.info("Пользователь зашёл на страницу логина");
  res.render("loginForm", { title: "Login", messanger: messanger });
};
exports.submit = (req, res, next) => {
  User.authentificate(req.body, (error, data) => {
    if (error) {
      logger.error(`Произошла ошибка: ${error}`);
      return next(error);
    }
    if (!data) {
      res.error("Имя или пароль неверный");
      logger.error("Имя или пароль неверный");
      res.redirect("back");
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      logger.info("Пользователь вошёл в аккаунт");
      //jwt generation
      const jwtTime = 500000;
      const token = jwt.sign(
        {
          name: data.email,
        },
        "aboba",
        {
          expiresIn: jwtTime,
        }
      );
      // создание cookie для пользователя
      res
        .cookie("jwt", token, { httpOnly: true, maxAge: jwtTime })
        .redirect("/");
      logger.info(`Создан новый токен для ${data.email}, Токен: ${token}`);
    }
  });
};

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.clearCookie("connect.sid");

  logger.info("Пользователь вышел");
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
