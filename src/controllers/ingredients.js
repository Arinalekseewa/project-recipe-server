import Ingredient from "../db/models/ingredient.js";

// контролер для отримання всіх інгредієнтів
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({}, "-__v");
    res.json({ ingredients });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
