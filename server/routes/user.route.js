import express from "express";
import updateUser from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

export default router;
