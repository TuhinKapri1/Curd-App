import express from "express";
import {categoryController} from "../controllers/category.controllers.js"
 const CategoryRouter = express.Router();

CategoryRouter.post("/", categoryController.createCategory);
CategoryRouter.get("/", categoryController.getAllcategory);



export {CategoryRouter}