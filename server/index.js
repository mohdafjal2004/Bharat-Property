import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to local DB"))
  .catch((error) => console.log(error));

const app = express();
app.listen(5000, () => {
  console.log(`Server is running on 3000`);
});
