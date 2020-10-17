const express = require("express");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db =require('./init/db')
app.use(cors());

app.use(bodyParser.json());

app.use(userRouter);
app.use(postRouter);

app.listen(port, () => {
  console.log(`Twitter app listening at http://localhost:${port}`);
});
