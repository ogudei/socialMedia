const { body } = require("express-validator");

const postRules = () => {
  return [
    // username must be an email
    body("title")
      .exists()
      .withMessage("title parametresi gönderilmeli")
      .bail()
      .isLength({ min: 1, max: 20 })
      .withMessage("başlık minimum 1, maximum 20 karakter olmalı"),
    // password must be at least 5 chars long
    body("post")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("Parola parametresi gönderilmeli")
      .bail()
      .isLength({ min: 1, max: 140 })
      .withMessage("post minimum 1, maximum 140 karakter olmalı"),
    body("userId")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("userId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("userId 24 karakter olmalı"),
  ];
};

module.exports = {
  postRules,
};
