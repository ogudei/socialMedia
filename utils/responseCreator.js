const NotificationType = require("../constants/notificationType")

const responseCreator = (notify, value) => {
  let notification = [{
    message: notify.message,
    type: notify.type
  }]
  let isValid = 1
  let notifiesTypes = notification.map(notifies => {
    return notifies.type == NotificationType.SUCCESS
  });
  if (notifiesTypes.includes(false)) {
    isValid = 0
  }
  let response = {
    notification: notification,
    isValid: isValid,
    value: value
  }
  return response
}

module.exports = {
    responseCreator
}