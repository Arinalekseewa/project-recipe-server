import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'ingredient',
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    thumb: {
      type: String, // посилання на картинку
      required: false,
    },
    time: {
      type: String, // наприклад: "30 min"
      required: true,
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
