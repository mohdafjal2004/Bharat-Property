import express from "express";
import {
  deleteUser,
  getUser,
  getUserListings,
  updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser); //User self account delete feature route
router.get("/listings/:id", verifyToken, getUserListings); //User getting all his listings
router.get("/:id", verifyToken, getUser);

export default router;
