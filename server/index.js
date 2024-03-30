import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to local DB"))
  .catch((error) => console.log(error));
app.use(express.json())
app.use("/api/user", userRoute);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log(`Server is running on 3000`);
});
