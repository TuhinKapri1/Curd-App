const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     refr: "User",
    //   },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
