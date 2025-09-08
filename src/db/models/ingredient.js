import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  },
);

export const IngredientCollection = model('Ingredient', ingredientSchema);