const logger = require("../logger/index");
const Entry = require("../models/entry");

exports.list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    res.render("entries", { title: "List" });
  });
};

exports.form = (req, res, next) => {
  logger.error("enter form entry");
  res.render("post", { title: "Post" });
};
exports.post = (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };
    Entry.create(entry);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

exports.delete = async (req, res, next) => {
  const entryId = req.params.id;

  Entry.delete(entryId, async (err) => {
    if (err) {
      return next(err);
    }
    await res.redirect("/posts");
  });
};

exports.updateForm = (req, res) => {
  const entryId = req.params.id;
  Entry.getEntryById(entryId, async (err, entry) => {
    if (err) {
      console.log(err);
      return res.redirect("posts");
    }
    await res.render("update", { title: "Изменение поста", entry: entry });
  });
};

exports.updateSubmit = async (req, res, next) => {
  const entryId = req.params.id;
  const newData = {
    title: req.body.entry.title,
    content: req.body.entry.content,
  };

  Entry.update(entryId, newData, (err) => {
    if (err) {
      return next(err);
    }
  });
  await res.redirect("/posts");
};
