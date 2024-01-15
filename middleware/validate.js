exports.getField = (req, field) => {
  let value;
  field.forEach((element) => {
    value = req.body[element];
  });
  return value;
};

function parseField(field) {
  return field.split(/\[|\]/).filter((s) => s);
}

exports.lengthAbove = (res, field, next) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error("required"); // r0T0BNT c006LLJeHNe
      res.redirect("back");
    }
  };
};
exports.required = (res, field, next) => {
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      res.error("required"); // r0T0BNT c006LLJeHNe
      res.redirect("back");
    }
  };
};
