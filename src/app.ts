import express from "express";
import cors from "cors";
import authroutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./docs/swagger.config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authroutes);
app.use("/private", protectedRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/", (_, res) => {
  res.send("E-commerce API is running");
});

export default app;
