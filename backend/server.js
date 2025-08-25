import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
//import jwt from "jsonwebtoken";
import { stripeWebhookHandler } from "./controllers/payment.controller.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
    "https://fashion-ecommerce-phi.vercel.app/api",
    "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Add error handler last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);

});
