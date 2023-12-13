const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db");

const sql =
  "CREATE TABLE IF NOT EXISTS `entries` (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, title TEXT NOT NULL , content TEXT NOT NULL)";

db.run(sql);

class Entry {
  constructor() {}

  static create(data) {
    const sql =
      "INSERT INTO entries (username, title, content) VALUES (?, ?, ?)";
    db.run(sql, data, username, data.title, data.content);
  }

  static selectAll(cb) {
    db.all(cb);
  }
}
