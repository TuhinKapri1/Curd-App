const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STR);
    console.log("Db connectinon successfully");
  } catch (err) {
    console.log(err);
  }
};
