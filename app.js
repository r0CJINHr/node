const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = "3000";
const app = express();
const fs = require("fs");
const myRoute = require("../node/routers/index-routers");
const ejs = require("ejs");
const Sequelize = require("sequelize");
const sqlite = require("sqlite3");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log(__dirname + "/public/favicon.ico");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "test.db",
  define: {
    timestamps: false,
  },
});

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
app.use(myRoute);
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

app.get("env") == "production";
console.log(app.get("env"));
if (app.get("env") == "production") {
  app.use((err, req, res) => {
    res.status(err.status);
    res.send(err.message);
  });
}
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => console.log(err));

User.create({
  name: "Tom",
  age: 35,
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

User.create({
  name: "Bob",
  age: 31,
})
  .then((res) => {
    const user = { id: res.id, name: res.name, age: res.age };
    console.log(user);
  })
  .catch((err) => console.log(err));

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
