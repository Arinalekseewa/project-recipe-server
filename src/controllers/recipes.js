import createHttpError from 'http-errors';
import { getRecipeById } from '../services/recipes.js';


export async function getRecipeByIdController(req, res) {
    const recipe = await getRecipeById(req.params.id);

    if (recipe === null) {
        throw new createHttpError.NotFound('Recipe not found');
    }

    res.json({
      status: 200,
      message: `Successfully found recipe!`,
      data: recipe,
    });
};
