import {IngredientCollection} from "../db/models/ingredient.js";

export const getAllIngredients = async (req, res) => {
  const ingredients = await IngredientCollection.find({}, "-__v");
  res.json({ ingredients });
};
