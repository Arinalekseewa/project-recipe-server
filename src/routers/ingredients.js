import express from "express";
import { getAllIngredients } from "../controllers/ingredients.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();


router.get("/", ctrlWrapper(getAllIngredients));

export default router;
