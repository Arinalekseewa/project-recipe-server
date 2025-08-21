import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 64 },
  desc: { type: String, maxlength: 512 },
  img: { type: String },
});

export default mongoose.model('Ingredient', ingredientSchema);