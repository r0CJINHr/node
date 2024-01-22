exports.getField = (req, field) => {
  let value = req.body;
  field.forEach((element) => {
    value = req.body[element];
  });
  return value;
};

function parseField(field) {
  return field.split(/\[|\]/).filter((s) => s);
}

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} должен составлять ${len} знаков`); // r0T0BNT c006LLjeHNe
      res.redirect("back");
    }
  };
};
exports.required = (res, field, next) => {
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} не заполнено`); // r0T0BNT c006LLjeHNe
      res.redirect("back");
    }
  };
};
