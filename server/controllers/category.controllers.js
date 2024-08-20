import {CategoryModel} from "../models/category.model.js"

class CategoryClass{
  createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }
      const isExist = await CategoryModel.findOne({ name: name });
      if (isExist) {
        return res.status(400).json({
          success: false,
          messgae: "Name is already exist",
        });
      }
      const category = await CategoryModel.create({
        name: name,
      });
      res.status(200).json({
        success: true,
        messgae: "Category created successfully",
        data: category,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  getAllcategory = async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (err) {
      console.log("Error happen in get All category", err);
      res.status(500).json({
        success: false,
        message: err.mnessage,
      });
    }
  };
}

export const categoryController=new CategoryClass();

