const PostModel = require("../models/post.model");

class PostClass {
  createPost = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Both field are required",
        });
      }
      const post = await PostModel.create({
        title,
        description,
      });
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post,
      });
    } catch (err) {
      console.log("Error happen in createpost", err);
    }
  };
  getAllPsot = async (req, res) => {
    try {
      const post = await PostModel.find({});
      res.status(200).json({
        success: true,
        message: "Fetch succesfully",
        data: post,
      });
    } catch (error) {
      console.log("error happen in getAllPost", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  getSinglePost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await PostModel.findOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "fetch successfully",
        data: post,
      });
    } catch (error) {
      console.log("error happen in getSingle post", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const isExist = await PostModel.findOne({ _id: id });
      if (!isExist) {
        return res.status(400).json({
          success: false,
          message: "Post does not found",
        });
      }
      const updatedPost = await PostModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: updatedPost,
      });
    } catch (error) {
      console.log("error happen in updatePost controllers", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const isExist = await PostModel.findOne({ _id: id });
      if (!isExist) {
        return res.status(400).json({
          success: false,
          message: "Post does not found",
        });
      }
      const deletdPost = await PostModel.findByIdAndDelete(
        { _id: id },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Post deletd successfully",
        data: deletdPost,
      });
    } catch (error) {
      console.log("Error happn in deletd post", error);
      res.status(500).josn({
        success: false,
        message: error.message,
      });
    }
  };
}

const postControllers = new PostClass();

module.exports = postControllers;
