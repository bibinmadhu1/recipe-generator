
import React, { useState, useCallback } from 'react';
import type { Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('chicken breast, broccoli, cherry tomatoes, garlic');
  const [complexity, setComplexity] = useState<number>(33); // 1-100 scale
  const [cuisine, setCuisine] = useState<string>('Italian');
  const [isPopular, setIsPopular] = useState<boolean>(true);

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipes(null);

    try {
      const result = await generateRecipes(
        ingredients,
        complexity,
        cuisine,
        isPopular
      );
      setRecipes(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, complexity, cuisine, isPopular]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-fit">
          <RecipeForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            complexity={complexity}
            setComplexity={setComplexity}
            cuisine={cuisine}
            setCuisine={setCuisine}
            isPopular={isPopular}
            setIsPopular={setIsPopular}
            onSubmit={handleGenerateRecipes}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-2">
          <RecipeDisplay
            recipes={recipes}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
