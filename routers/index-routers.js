const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const entries = require("../controllers/entries");

router.get("/a", entries.list);
// router.post("/entry", entry.forma);

router.get("/register", register.form);
router.post("/register", register.submit);

// router.get("/login", login.form);
// router.post("/login", login.submit);

module.exports = router;
