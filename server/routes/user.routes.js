import express from "express";
import { userControllers } from "../controllers/user.controllers.js";
import { fileUpload } from "../utils/fileUpload.js";

const AuthRouter = express.Router();

AuthRouter.post(
  "/sign-up",
  fileUpload.single("profilePicture"),
  userControllers.signupUser
);
AuthRouter.post("/sign-in", userControllers.signinUser);

export { AuthRouter };
