const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = "3000";
const app = express();
const fs = require("fs");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log(__dirname + "/public/favicon.ico");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "views")));

app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/css/bootstrap.css",
  express.static(
    path.join(__dirname, "/public/CSS/bootstrap-5.3.2/dist/css/bootstrap.css")
  )
);

app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/public/index.html");
  addLine("ping to / ");
});

app.post("/test", function (req, res) {
  addLine("test.post");
  console.log("прошли в папку test");
  console.log(req.body);
  res.end("прошли post test");
});

app.get("env") == "production";
console.log(app.get("env"));
if (app.get("env") == "production") {
  app.use((err, req, res) => {
    res.status(err.status);
    res.send(err.message);
  });
}

function addLine(line) {
  line = line + " timestamp " + new Date().toLocaleString();
  fs.appendFile(
    path.join(__dirname + "/public/logger.txt"),
    line + "\n",
    (err) => {
      if (err) console.log(err);
    }
  );
}
app.use((req, res, next) => {
  const err = new Error("PAGE NOT FOUND");
  err.code = 404;
  next(err);
});

const uri =
  "https://ru.hostings.info/upload/images/2021/12/e11044b915dc39afc3004430606bd6d1.jpg";

if (app.get("env") != "development") {
  app.use(function (err, req, res, next) {
    res.status = 404;
    res.render("error.ejs", { err, uri });
  });
} else {
  app.use(function (err, req, res, next) {
    console.log(app.get("env"), err.code, err.message);
  });
}

app.listen(port, () => {
  console.log("listening on port: " + port);
  addLine("Server started");
});
