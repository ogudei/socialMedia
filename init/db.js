const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/twitter",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("db started...");
  }
);
