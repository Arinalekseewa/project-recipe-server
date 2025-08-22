import Category from "../db/models/category.js";

// контролер для отримання всіх категорій
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "-__v");
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
