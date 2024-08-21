import { CartModel } from "../models/cart.model.js";
import { UserModel } from "../models/user.controllers.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, isPasswordMatch } from "../utils/hashingPassword.js";

class UserClass {
  signupUser = async (req, res) => {
    try {
      const { email, password, name } = req.body;

      console.log(req.body)

      console.log(req.file)

      if (!email || !password || !name || !req.file) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const isUserExist = await UserModel.findOne({ email: email });

      if (isUserExist) {
        return res.status(400).json({
          success: false,
          message: "User already exist",
        });
      }
      const _hashPassword = await hashPassword(password);
      console.log(_hashPassword);
      const usercart = await CartModel.create({
        products: [],
      });
      const user = new UserModel({
        email,
        password: _hashPassword,
        name,
        profilePicture: req.file.filename,
        cart:usercart._id
      });
      const newUser = await user.save();
      const { password: _password, ...rest } = newUser._doc;
      res.status(200).json({
        success: true,
        message: "User created successfully",
        user: rest,
      });
    } catch (err) {
      console.log("Error happen in createUser");
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  signinUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email)
      const isExistUser = await UserModel.findOne({ email: email });

      if (!isExistUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const isMatch = await isPasswordMatch(password, isExistUser.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      const payload = {
        id: isExistUser._id,
        email: isExistUser.email,
        role: isExistUser.role,
      };
      const token = await generateToken(payload, process.env.SECRET_KEY);
      const { password: _password, ...rest } = isExistUser._doc;
      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: rest,
        token: token,
      });
    } catch (err) {
      console.log("Error happen in signinUser");
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export const userControllers = new UserClass();
