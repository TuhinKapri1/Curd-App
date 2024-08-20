import { ProductModel } from "../models/product.model.js";
import { ProductVarientModel } from "../models/productVariant.models.js";

class ProductVariantClass {
  createProductvariant = async (req, res) => {
    try {
      const { price, color, quantity, size } = req.body;
      const userId = req.user.id;
      if (!price || !color || !quantity || !size) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const isExistproduct = await ProductModel.findOne({ _id: req.params.id });
      if (!isExistproduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      if (isExistproduct.userId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to create product variant for this product",
        });
      }

      const isAlreadyExist = await ProductVarientModel.findOne({
        price: parseInt(price),
        color,
        quantity: parseInt(quantity),
        size,
      });
      if (isAlreadyExist) {
        isAlreadyExist.quantity += parseInt(quantity);
        await isAlreadyExist.save();
      } else {
        const productvariant = await ProductVarientModel.create({
          price: parseInt(price),
          color,
          quantity: parseInt(quantity),
          size,
        });

        const updateProduct = await ProductModel.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              productVarients: productvariant._id,
            },
            $set: {
              status: "Public",
            },
          },
          { new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Product Variant create successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  updateProductVariant = async (req, res) => {
    try {
      const { postId, productvariantId } = req.params;
      const { id } = req.user;
      const isExistProductvariant = await ProductVarientModel.findOne({
        _id: productvariantId,
      });
      if (!isExistProductvariant) {
        return res.status(404).json({
          success: false,
          message: "Product Variant not found",
        });
      }
      const isExistProduct = await ProductModel.findById({ _id: postId });
      if (!isExistProduct) {
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      }
      if (isExistProduct.userId.toString() !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this product variant",
        });
      }
      const updatedProduct = await ProductVarientModel.findByIdAndUpdate(
        {
          _id: productvariantId,
        },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Product Variant updated successfully",
        data: updatedProduct,
      });
    } catch (err) {
      console.log("Error hapopen in updateProductvariant controllers", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  deleteProductVariant = async (req, res) => {
    try {
      const { id } = req.user;
      const { postId, productvariantId } = req.params;
      const isExistProductvariant = await ProductVarientModel.findOne({
        _id: productvariantId,
      });
      if (!isExistProductvariant) {
        return res.status(404).json({
          success: false,
          message: "Product Variant not found",
        });
      }
      const isExistProduct = await ProductModel.findById({ _id: postId });
      if (!isExistProduct) {
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      }
      if (isExistProduct.userId.toString() !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this product variant",
        });
      }

      await ProductVarientModel.findByIdAndDelete({
        _id: productvariantId,
      });

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: {
            productVarients: productvariantId,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Product variant deleted successfully",
      });
    } catch (err) {
      console.log("Error hapening in deleteProductvariant controllers", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export const productVarientController = new ProductVariantClass();
