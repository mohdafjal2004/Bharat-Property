import express from "express";
import userReg from "../controller/user.controller.js";
const router = express.Router();

router.get("/test", userReg);

export default router;
