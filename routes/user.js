const express = require("express");
const userAuth = require("../auth/userAuth");
const NotificationType = require("../constants/notificationType");
const userRules = require("../validation/rules/user").userRules;
const validate = require("../validation/validate").validate;
const validationResponse = require("../validation/validationResponse")
  .validationResponse;
const responseCreator = require("../utils/responseCreator").responseCreator;
const userLogic = require("../logic/user");
const User = require("../logicModels/user");

const userRouter = express.Router();

userRouter.post("/signin", userRules(), validate, async (req, res) => {
  let response = null;
  let errorResponse = null;
  let status = null;
  let notification = null;
  if (req.validationErrors.length > 0) {
    errorResponse = validationResponse(req.validationErrors);
    response = responseCreator(
      errorResponse.errorMessage,
      errorResponse.errorData
    );
    status = 443;
  } else {
    let user = new User(req.body.email, req.body.password, req.body.token);
    let result = await userLogic.signIn(user);
    if (result == NotificationType.SUCCESS) {
      notification = {
        message: "Giriş başarılı",
        type: NotificationType.SUCCESS,
      };
      status = 200;
      response = responseCreator(notification.message, notification);
    } else if (result == NotificationType.WARNING) {
      notification = {
        message: "Kullanıcı Adı veya Şifre yanlış",
        type: NotificationType.WARNING,
      };
      status = 200;
      response = responseCreator(notification.message, notification);
    }
    res.status(status).send(response);
  }
});

userRouter.post("/signup", userRules(), validate, async (req, res) => {
  let response = null;
  let errorResponse = null;
  let status = null;
  let notification = null;
  if (req.validationErrors.length > 0) {
    errorResponse = validationResponse(req.validationErrors);
    response = responseCreator(
      errorResponse.errorMessage,
      errorResponse.errorData
    );
    status = 443;
  } else {
    let user = new User(req.body.email, req.body.password, req.body.username);
    let result = await userLogic.signUp(user);

    switch (result) {
      case NotificationType.SUCCESS: {
        notification = {
          message: "Kayıt başarılı",
          type: NotificationType.SUCCESS,
        };
        status = 200;
        response = responseCreator(notification.message, notification);
        break;
      }
      case NotificationType.WARNING: {
        notification = {
          message: "Kayıt sırasında hata oluştu",
          type: NotificationType.WARNING,
        };
        status = 200;
        response = responseCreator(notification.message, notification);
        break;
      }
      case NotificationType.INFO: {
        notification = {
          message: "Kullanıcı mevcut",
          type: NotificationType.INFO,
        };
        status = 200;
        response = responseCreator(notification.message, notification);
        break;
      }
      default:
        break;
    }
    res.status(status).send(response);
  }
});

module.exports = userRouter;
