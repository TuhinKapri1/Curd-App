const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./config/db.connection");
const PostRouter=require('./routes/post.routes')
require("dotenv").config();
const app = express();

app.use(express.json());
dbConnection();
app.use(cors());

app.use("/api/v1/post", PostRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is started at ", PORT);
});
