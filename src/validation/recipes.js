import Joi from "joi";

export const createRecipeSchema = Joi.object({
  name: Joi.string().max(64).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.max": "Name should have at most 64 characters",
    "any.required": "Name is required",
  }),

  decr: Joi.string().max(200).required().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description cannot be empty",
    "string.max": "Description should have at most 200 characters",
    "any.required": "Description is required",
  }),

  cookiesTime: Joi.number().integer().min(1).max(360).required().messages({
    "number.base": "Cooking time should be a number",
    "number.integer": "Cooking time must be an integer (minutes)",
    "number.min": "Cooking time should be at least 1 minute",
    "number.max": "Cooking time should not exceed 360 minutes",
    "any.required": "Cooking time is required",
  }),

  cals: Joi.number().integer().min(1).max(10000).optional().messages({
    "number.base": "Calories should be a number",
    "number.integer": "Calories must be an integer",
    "number.min": "Calories should be at least 1",
    "number.max": "Calories should not exceed 10000",
  }),

  category: Joi.string().required().messages({
    "string.base": "Category should be a string",
    "string.empty": "Category cannot be empty",
    "any.required": "Category is required",
  }),

  ingredient: Joi.string().required().messages({
    "string.base": "Ingredient should be a string",
    "string.empty": "Ingredient cannot be empty",
    "any.required": "Ingredient is required",
  }),

  ingredientAmount: Joi.number().integer().min(2).max(16).required().messages({
    "number.base": "Ingredient amount should be a number",
    "number.integer": "Ingredient amount must be an integer",
    "number.min": "Ingredient amount should be at least 2",
    "number.max": "Ingredient amount should not exceed 16",
    "any.required": "Ingredient amount is required",
  }),

  instruction: Joi.string().max(1200).required().messages({
    "string.base": "Instruction should be a string",
    "string.empty": "Instruction cannot be empty",
    "string.max": "Instruction should have at most 1200 characters",
    "any.required": "Instruction is required",
  }),

  recipeImg: Joi.object({
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/webp")
      .messages({
        "any.only": "Recipe image must be a JPEG, PNG or WebP file",
      }),
    size: Joi.number().max(2 * 1024 * 1024).messages({
      "number.max": "Recipe image size must not exceed 2 MB",
    }),
  })
    .optional()
    .messages({
      "object.base": "Recipe image should be a file object",
    }),
});
