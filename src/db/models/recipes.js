import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 64,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    instructions: {
      type: String,
      required: true,
      maxlength: 1200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    time: {
      type: Number,
      required: true,
      min: 1,
      max: 360,
    },
    ingredients: [
      {
        ingredient: { type: String, required: true },
        ingredientAmount: { type: Number, required: true, min: 2, max: 16 },
      }
    ],
    cals: {
      type: Number,
      min: 1,
      max: 10000,
    },
    thumb: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipe', recipeSchema);