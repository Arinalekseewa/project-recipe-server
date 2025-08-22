import express from "express";
import { getAllIngredients } from "../controllers/ingredients.js";

const router = express.Router();

// GET /api/ingredients
router.get("/", getAllIngredients);

export default router;
