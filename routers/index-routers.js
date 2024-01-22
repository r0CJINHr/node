const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validate = require("../middleware/validate");

router.get("/posts", entries.list);

router.post("/post", entries.form);
router.post(
  "/post",
  validate.required("title"),
  validate.required("content"),
  entries.post
);

router.get("/update/:id", entries.updateForm);
router.post("/update/:id", entries.updateSubmit);

router.get("/delete/:id", entries.delete);

router.get("/register", register.form);
router.post(
  "/register",
  validate.required("email"),
  validate.lengthAbove("name", 4),
  register.submit
);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/logout", login.logout);

module.exports = router;
