const express = require("express");
const {userAuthLayer} = require("../middleware/auth/userAuth");
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

userRouter.post("/signin", rules.user(), validate, async (req, res) => {
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
    let signed = await userLogic.signIn(user);
    notification = notificationCreator(
      "Giriş başarılı",
      "Kullanıcı Adı veya Şifre yanlış",
      "Giriş yapılırken hata ile karşılaşıldı",
      "Token güncellenirken hata ile karşılaşıldı."
    );
    status = 200;
    response = responseCreator(signed.result, notification, signed.value);
    res.status(status).send(response);
  }
});

userRouter.post("/signup", rules.user(), validate, async (req, res) => {
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
    let user = new User(
      req.body.email,
      req.body.password,
      req.body.username,
      undefined,
      [],
      []
    );
    let signedUp = await userLogic.signUp(user);
    notification = notificationCreator(
      "Kullanıcı başarı ile oluşturuldu",
      "Kullanıcı Mevcut",
      undefined,
      "Kullanıcı oluşturulurken problem oluştu"
    );
    status = 200;
    response = responseCreator(signedUp.result, notification, signedUp.value);
  }
  res.status(status).send(response);
});

userRouter.post(
  "/follow",
  [userAuthLayer],
  rules.follow(),
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
      let result = await userLogic.follow(
        req.id,
        req.body.userId
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
  }
);

userRouter.post(
  "/unfollow",
  [userAuthLayer],
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
        req.id,
        req.body.userId
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
userRouter.get(
  "/following",
  [userAuthLayer],
  //  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    // if (req.validationErrors.length > 0) {
    //   errorResponse = validationResponse(req.validationErrors);
    //   response = responseCreator(
    //     NotificationType.ERROR,
    //     notificationCreator(
    //       undefined,
    //       undefined,
    //       undefined,
    //       errorResponse.errorMessage
    //     ),
    //     errorResponse.errorData
    //   );

    //   status = 443;
    // } else {
    let following = await userLogic.following(req.id);

    notification = notificationCreator(
      "Takip edilenler başarı ile getirildi.",
      "Takip edilenler mevcut değil",
      undefined,
      "Takip edilenler getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(following.result, notification, following.value);

    res.status(status).send(response);
    // }
  }
);

userRouter.get(
  "/followers",
  [userAuthLayer],
  //  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    // if (req.validationErrors.length > 0) {
    //   errorResponse = validationResponse(req.validationErrors);
    //   response = responseCreator(
    //     NotificationType.ERROR,
    //     notificationCreator(
    //       undefined,
    //       undefined,
    //       undefined,
    //       errorResponse.errorMessage
    //     ),
    //     errorResponse.errorData
    //   );

    //   status = 443;
    // } else {
    let followers = await userLogic.followers(req.id);

    notification = notificationCreator(
      "Takipçiler başarı ile getirildi.",
      "Takipçi mevcut değil",
      undefined,
      "Takipçiler getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(followers.result, notification, followers.value);

    res.status(status).send(response);
    // }
  }
);

userRouter.get(
  "/whotofollow",
  [userAuthLayer],
  //  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    // if (req.validationErrors.length > 0) {
    //   errorResponse = validationResponse(req.validationErrors);
    //   response = responseCreator(
    //     NotificationType.ERROR,
    //     notificationCreator(
    //       undefined,
    //       undefined,
    //       undefined,
    //       errorResponse.errorMessage
    //     ),
    //     errorResponse.errorData
    //   );

    //   status = 443;
    // } else {
    let whotofollow = await userLogic.whoToFollow(req.id);

    notification = notificationCreator(
      "Önerilen kullanıcılar başarı ile getirildi.",
      "Önerilen kullanıcı mevcut değil",
      undefined,
      "Önerilen kullanıcılar getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(whotofollow.result, notification, whotofollow.value);

    res.status(status).send(response);
    // }
  }
);
userRouter.get(
  "/me",
  [userAuthLayer],
  //  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    // if (req.validationErrors.length > 0) {
    //   errorResponse = validationResponse(req.validationErrors);
    //   response = responseCreator(
    //     NotificationType.ERROR,
    //     notificationCreator(
    //       undefined,
    //       undefined,
    //       undefined,
    //       errorResponse.errorMessage
    //     ),
    //     errorResponse.errorData
    //   );

    //   status = 443;
    // } else {
    let me = await userLogic.me(req.id);

    notification = notificationCreator(
      "Kullanıcı bilgileri başarı ile getirildi.",
      "Kullanıcı mevcut değil",
      undefined,
      "Kullanıcı bilgileri getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(me.result, notification, me.value);

    res.status(status).send(response);
    // }
  }
);

userRouter.post(
  "/user",
  [userAuthLayer],
  //  validate,
  async (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    // if (req.validationErrors.length > 0) {
    //   errorResponse = validationResponse(req.validationErrors);
    //   response = responseCreator(
    //     NotificationType.ERROR,
    //     notificationCreator(
    //       undefined,
    //       undefined,
    //       undefined,
    //       errorResponse.errorMessage
    //     ),
    //     errorResponse.errorData
    //   );

    //   status = 443;
    // } else {
    let me = await userLogic.me(req.body.userId);

    notification = notificationCreator(
      "Kullanıcı bilgileri başarı ile getirildi.",
      "Kullanıcı mevcut değil",
      undefined,
      "Kullanıcı bilgileri getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(me.result, notification, me.value);

    res.status(status).send(response);
    // }
  }
);

module.exports = userRouter;
