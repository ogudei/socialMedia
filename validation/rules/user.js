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

const followRules = () => {
  return [
    // username must be an email
    body("userId")
      .exists()
      .withMessage("userId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("userId parametresi 24 karakter olmalı"),
    // password must be at least 5 chars long
    body("followedUserId")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("followedUserId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("followedUserId parametresi 24 karakter olmalı"),
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
    body("unfollowedUserId")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("unfollowedUserId parametresi gönderilmeli")
      .bail()
      .isLength({ min: 24, max: 24 })
      .withMessage("unfollowedUserId parametresi 24 karakter olmalı"),
  ];
};

module.exports = {
  userRules,
  followRules,
  unfollowRules
};
