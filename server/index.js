import express from "express";
import cors from "cors";
import { ProductRouter } from "./routes/product.routes.js";
import { CategoryRouter } from "./routes/category.routes.js";
import { dbConnection } from "./config/db.connection.js";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/user.routes.js";
import { CartRouter } from "./routes/cart.routes.js";
import { OrderRouter } from "./routes/order.routes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/uploads", express.static("./uploads"));
dbConnection();
app.use(cors());

app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/auth", AuthRouter);
app.use('/api/v1/cart',CartRouter)
app.use('/api/v1/order',OrderRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is started at ", PORT);
});
