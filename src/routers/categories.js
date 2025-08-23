import express from "express";
import { getAllCategories } from "../controllers/categories.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js"; 

const router = express.Router();

router.get('/', ctrlWrapper(getAllCategories));

export default router;
