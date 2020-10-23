const express = require("express");
const { userAuthLayer } = require("../middleware/auth/userAuth");
const postRules = require("../validation/rules/post");
const validate = require("../validation/validate").validate;
const validationResponse = require("../validation/validationResponse")
  .validationResponse;
const responseCreator = require("../utils/responseCreator").responseCreator;
const notificationCreator = require("../utils/responseCreator")
  .notificationCreator;

const NotificationType = require("../constants/notificationType");
const postLogic = require("../logic/post");
const PostModel = require("../logicModels/post");

const postRouter = express.Router();
postRouter.post(
  "/createpost",
  [userAuthLayer],
  // postRules.create(),
  // validate,
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
    let post = new PostModel(
      req.id,
      req.user.username,
      req.body.title,
      req.body.post,
      "public",
      true
    );
    let result = await postLogic.createPost(post);
    if (result == NotificationType.SUCCESS) {
      notification = notificationCreator(
        "Post başarı ile oluşturuldu.",
        undefined,
        undefined,
        "post oluşturulurken hata ile karşılaşıldı"
      );
      status = 200;
      response = responseCreator(result, notification, notification.message);
    }

    res.status(status).send(response);
  }
  // }
);

postRouter.get(
  "/posts",
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
    let posts = await postLogic.getPostsByUser(req.id, "public");

    notification = notificationCreator(
      "Postlar başarı ile getirildi.",
      "Post mevcut değil",
      undefined,
      "Postlar getirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(posts.result, notification, posts.value);

    res.status(status).send(response);
    // }
  }
);

postRouter.post(
  "/poststatuschanged",
  [userAuthLayer],
  // postRules.create(),
  // validate,
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

    let switched = await postLogic.switchPostStatus(
      req.body.tweetId,
      req.body.status
    );
    notification = notificationCreator(
      "Post durumu başarı ile oluşturuldu.",
      "Post durumu değiştirilemedi",
      undefined,
      "Post durumu değiştirilirken hata ile karşılaşıldı"
    );
    status = 200;
    response = responseCreator(switched.result, notification, switched.value);

    res.status(status).send(response);
  }
  // }
);

module.exports = postRouter;
