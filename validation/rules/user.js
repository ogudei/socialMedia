const { body } = require("express-validator");

const user = () => {
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

const follow = () => {
  return [
    // username must be an email
    body("userId")
      .exists()
      .withMessage("userId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("userId parametresi 24 karakter olmalı"),
    // password must be at least 5 chars long
    
  ];
};
const unfollowRules = () => {
  return [
    // username must be an email
    body("userId")
      .exists()
      .withMessage("userId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("userId parametresi 24 karakter olmalı"),
    // password must be at least 5 chars long

  ];
};

module.exports = {
  user,
  follow,
  unfollowRules
};
