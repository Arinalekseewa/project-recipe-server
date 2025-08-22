import Ingredient from "../db/models/ingredient.js";

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find({}, "-__v");
  res.json({ ingredients });
};
