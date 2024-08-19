const postControllers = require("../controllers/post.controllers");

const PostRouter = require("express").Router();

PostRouter.post("/", postControllers.createPost);
PostRouter.get("/", postControllers.getAllPsot);
PostRouter.get("/:id", postControllers.getSinglePost);
PostRouter.put("/:id", postControllers.updatePost);
PostRouter.delete("/:id", postControllers.deletePost);

module.exports = PostRouter;
