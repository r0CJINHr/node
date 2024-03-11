const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const passport = require("passport");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validate = require("../middleware/validate");
const ensureAuthenticated = require("../middleware/isAuthenticate");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная",
  });
});
router.get("/posts", entries.list);
router.get("/post", ensureAuthenticated, entries.form);
router.post(
  "/post",
  ensureAuthenticated,

  validate.required("[entry[title]]"),
  entries.submit
);

router.get(
  "/auth/yandex",
  passport.authenticate("yandex"),
  function (req, res) {}
);

router.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/update/:id", entries.updateForm);
router.post("/update/:id", entries.updateSubmit);

router.get("/delete/:id", entries.delete);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/logout", login.logout);

module.exports = router;
