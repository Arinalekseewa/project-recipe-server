import Category from "../db/models/category.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find({}, "-__v"); 
  res.json({ categories });
};
