const validationResponse = (validationErrors) =>{
    let errorMessage = [], errorData = []
      for (let index = 0; index < validationErrors.length; index++) {
        errorMessage.push(validationErrors[index].notification) 
        errorData.push(validationErrors[index].data)  
      }
      // let userquestionResponse = {
      //   notification: notification,
      //   isValid: 0,
      //   value: errorData
      // }
      return {errorMessage:errorMessage,errorData:errorData}
  }
  
  module.exports={
    validationResponse
  }