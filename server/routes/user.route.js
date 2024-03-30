import express from "express";
import userReg from "../controller/user.controller.js";
const router = express.Router();

router.get("/", userReg);

export default router;
