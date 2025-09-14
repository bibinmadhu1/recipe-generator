
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{recipe.recipeName}</h2>
        <p className="text-slate-600 mb-6">{recipe.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b-2 border-secondary pb-1">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b-2 border-secondary pb-1">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
