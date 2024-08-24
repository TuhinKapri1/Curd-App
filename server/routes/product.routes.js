import express from "express";
import { fileUpload } from "../utils/fileUpload.js";
import { productController } from "../controllers/product.controllers.js";
import { productVarientController } from "../controllers/productvariant.controllers.js";
import { isAuth } from "../middleware/auth.js";

const ProductRouter = express.Router();

//products
ProductRouter.post(
  "/",
  isAuth,
  fileUpload.single("thumbnail"),
  productController.createProduct
);
ProductRouter.get("/", productController.getAllProduct);
ProductRouter.get("/user-product", isAuth, productController.getUserProducts);
ProductRouter.get(
  "/user-order",
  isAuth,
  productController.getUserOrderedProducts
);
ProductRouter.get("/:id", productController.getSingleProduct);
ProductRouter.put(
  "/:postId",
  isAuth,
  fileUpload.single("thumbnail"),
  productController.updateProduct
);
ProductRouter.delete("/:postId", isAuth, productController.deletedProduct);

//product variant
ProductRouter.post(
  "/:id/product-variant",
  isAuth,
  productVarientController.createProductvariant
);
ProductRouter.put(
  "/:postId/product-variant/:productvariantId",
  isAuth,
  productVarientController.updateProductVariant
);

ProductRouter.delete(
  "/:postId/product-variant/:productvariantId",
  isAuth,
  productVarientController.deleteProductVariant
);

export { ProductRouter };
