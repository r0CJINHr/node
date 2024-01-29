exports.getField = (req, parsedField) => {
  value = req.body[parsedField[0]][parsedField[1]];

  return value;
};

function parseField(field) {
  return field.split(/\[|\]/).filter((s) => s);
}

exports.lengthAbove = (field, len) => {
  let parsedField = parseField(field);
  return (req, res, next) => {
    if (getField(req, parseField).length > len) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} должен составлять ${len} знаков`); // r0T0BNT c006LLjeHNe
      res.redirect("back");
    }
  };
};
exports.required = (res, field, next) => {
  return (req, res, next) => {
    if (getField(req, parseField)) {
      next();
    } else {
      res.error(`Поле ${field.join(" ")} не заполнено`); // r0T0BNT c006LLjeHNe
      res.redirect("back");
    }
  };
};
