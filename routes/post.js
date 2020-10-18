const express = require("express");
const { userAuthLayer } = require("../auth/userAuth");
const postRules = require("../validation/rules/post").postRules;
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
  postRules(),
  validate,
  (req, res) => {
    let response = null;
    let errorResponse = null;
    let status = null;
    let notification = null;
    if (req.validationErrors.length > 0) {
      errorResponse = validationResponse(req.validationErrors);
      response = responseCreator(
        NotificationType.ERROR,
        notificationCreator(undefined, undefined, undefined, errorResponse.errorMessage),
        errorResponse.errorData
      );

      status = 443;
    } else {
      let post = new PostModel(null, req.body.title, req.body.post);
      let result = postLogic.createPost(post);
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
  }
);

module.exports = postRouter;
