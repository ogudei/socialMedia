const express = require("express");
const userAuth = require("../auth/userAuth");
const NotificationType = require("../constants/notificationType");
const rules = require("../validation/rules/user");
const validate = require("../validation/validate").validate;
const validationResponse = require("../validation/validationResponse")
  .validationResponse;
const responseCreator = require("../utils/responseCreator").responseCreator;
const userLogic = require("../logic/user");
const User = require("../logicModels/user");
const notificationCreator = require("../utils/responseCreator")
  .notificationCreator;

const userRouter = express.Router();

userRouter.post("/signin", rules.userRules(), validate, async (req, res) => {
  let response = null;
  let errorResponse = null;
  let status = null;
  let notification = null;
  if (req.validationErrors.length > 0) {
    errorResponse = validationResponse(req.validationErrors);
    response = responseCreator(
      NotificationType.ERROR,
      notificationCreator(
        undefined,
        undefined,
        undefined,
        errorResponse.errorMessage
      ),
      errorResponse.errorData
    );
    status = 443;
  } else {
    let user = new User(req.body.email, req.body.password, req.body.token);
    let result = await userLogic.signIn(user);
    notification = notificationCreator(
      "Giriş başarılı",
      "Kullanıcı Adı veya Şifre yanlış",
      "Giriş yapılırken hata ile karşılaşıldı",
      "Token güncellenirken hata ile karşılaşıldı."
    );
    status = 200;
    response = responseCreator(result, notification, {});
    res.status(status).send(response);
  }
});

userRouter.post("/signup", rules.userRules(), validate, async (req, res) => {
  let response = null;
  let errorResponse = null;
  let status = null;
  let notification = null;
  if (req.validationErrors.length > 0) {
    errorResponse = validationResponse(req.validationErrors);
    response = responseCreator(
      NotificationType.ERROR,
      notificationCreator(
        undefined,
        undefined,
        undefined,
        errorResponse.errorMessage
      ),
      errorResponse.errorData
    );
    status = 443;
  } else {
    let user = new User(req.body.email, req.body.password, req.body.username);
    let result = await userLogic.signUp(user);
    notification = notificationCreator(
      "Kullanıcı başarı ile oluşturuldu",
      "Kullanıcı Mevcut",
      undefined,
      "Kullanıcı oluşturulurken problem oluştu"
    );
    status = 200;
    response = responseCreator(result, notification, {});
  }
  res.status(status).send(response);
});

userRouter.post("/follow", rules.followRules(), validate, async (req, res) => {
  let response = null;
  let errorResponse = null;
  let status = null;
  let notification = null;
  if (req.validationErrors.length > 0) {
    errorResponse = validationResponse(req.validationErrors);
    response = responseCreator(
      NotificationType.ERROR,
      notificationCreator(
        undefined,
        undefined,
        undefined,
        errorResponse.errorMessage
      ),
      errorResponse.errorData
    );
    status = 443;
  } else {
    let result = await userLogic.follow(
      req.body.userId,
      req.body.followedUserId
    );
    notification = notificationCreator(
      "Kullanıcı takip edildi.",
      "Kendinizi takip edemezsiniz.",
      undefined,
      "Kullanıcı takip edilirken problem oluştu"
    );
    status = 200;
    response = responseCreator(result, notification, {});
  }
  res.status(status).send(response);
});

userRouter.post(
  "/unfollow",
  rules.unfollowRules(),
  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    if (req.validationErrors.length > 0) {
      errorResponse = validationResponse(req.validationErrors);
      response = responseCreator(
        NotificationType.ERROR,
        notificationCreator(
          undefined,
          undefined,
          undefined,
          errorResponse.errorMessage
        ),
        errorResponse.errorData
      );
      status = 443;
    } else {
      let result = await userLogic.unfollow(
        req.body.userId,
        req.body.unfollowedUserId
      );
      notification = notificationCreator(
        "Kullanıcı takipten çıkarıldı.",
        "Kendinizi takipten çıkaramazsınız",
        undefined,
        "Kullanıcı oluşturulurken problem oluştu"
      );
      status = 200;
      response = responseCreator(result, notification, {});
    }
    res.status(status).send(response);
  }
);
module.exports = userRouter;
