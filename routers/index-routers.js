const express = require("express");
const router = express.Router();
const register = require("../controllers/register");

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
  addLine("ping to / ");
});
router.post("/test", function (req, res) {
  addLine("test.post");
  console.log("прошли в папку test");
  console.log(req.body);
  res.end("прошли post test");
});

router.get("/register", register.form);
router.post("/register", register.submit);

module.exports = router;
