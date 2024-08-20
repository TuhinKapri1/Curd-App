import mongoose from "mongoose";
import { ProductModel } from "../models/product.model.js";
import { ProductVarientModel } from "../models/productVariant.models.js";

class ProductClass {
  createProduct = async (req, res) => {
    try {
      const { name, description, category } = req.body;
      const userId = req.user.id;
      if (!name || !description || !category || !req.file) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const product = await ProductModel.create({
        name,
        description,
        category,
        thumbnail: req.file.filename,
        userId: userId,
      });

      console.log(product);

      res.status(200).json({
        success: true,
        messgae: "Product created successfully",
        data: product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        messgae: err.message,
      });
    }
  };
  getAllProduct = async (req, res) => {
    try {
      const products = await ProductModel.aggregate([
        {
          $match: {},
        },
      ]);
      res.status(200).json({
        success: true,
        message: "All products fetched successfully",
        data: products,
      });
    } catch (err) {
      console.log("Error happen in getAll Product", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  getSingleProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $lookup: {
            from: "productvarients",
            localField: "productVarients",
            foreignField: "_id",
            as: "productVarients",
          },
        },
        {
          $unwind: "$productVarients",
        },
        {
          $group: {
            _id: {
              size: "$productVarients.size",
            },
            totalQuantity: {
              $sum: "$productVarients.quantity",
            },
            totalProduct: {
              $push: "$$ROOT",
            },
          },
        },
      ]);

      console.log(product);

      res.status(200).json({
        success: true,
        message: "Fetch successfuly",
        data: product,
      });
    } catch (err) {
      console.log("Error happen in get single Product", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  updateProduct = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = req.user;

      const isProductOwnerSame = await ProductModel.findById({ _id: postId });

      console.log(isProductOwnerSame.userId.toString());
      console.log(id);
      if (isProductOwnerSame.userId.toString() !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this product",
        });
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        { _id: postId },
        {
          $set: {
            ...req.body,
            ...(req.file && { thumbnail: req.file.filename }),
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (err) {
      console.log("Error in updateProduct", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  deletedProduct = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = req.user;

      const isProductOwnerSame = await ProductModel.findById({ _id: postId });
      if (isProductOwnerSame.userId.toString() !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this product",
        });
      }

      for (let i = 0; i < isProductOwnerSame.productVarients.length; i++) {
        await ProductVarientModel.findByIdAndDelete({
          _id: isProductOwnerSame.productVarients[i],
        });
      }

      await ProductModel.findByIdAndDelete({ _id: postId });

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (err) {
      console.log("Error in deletedProduct", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export const productController = new ProductClass();
