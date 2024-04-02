import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
 //Just to allow the contact in frontend the user should be authenticated
export default router;
