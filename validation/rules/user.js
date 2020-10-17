const { body } = require("express-validator");

const userRules = () => {
  return [
    // username must be an email
    body("email")
      .exists()
      .withMessage("Email parametresi gönderilmeli")
      .bail()
      .isEmail()
      .withMessage("Email formatı uyumsuz"),
    // password must be at least 5 chars long
    body("password")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("Parola parametresi gönderilmeli")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Parola minimum 5 karakter olmalı"),
  ];
};

module.exports = {
  userRules,
};
