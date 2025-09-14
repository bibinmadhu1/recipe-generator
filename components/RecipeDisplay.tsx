
import React from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeDisplayProps {
  recipes: Recipe[] | null;
  isLoading: boolean;
  error: string | null;
}

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-t-4 border-t-primary border-slate-200 rounded-full animate-spin"></div>
    </div>
);

const Alert: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">Error</p>
        <p>{message}</p>
    </div>
);

const InitialState: React.FC = () => {
    const WelcomeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    );

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-100 rounded-2xl h-full border-2 border-dashed border-slate-300">
            <WelcomeIcon />
            <h2 className="mt-4 text-2xl font-bold text-slate-600">Let's Get Cooking!</h2>
            <p className="mt-2 text-slate-500">
                Enter your ingredients and preferences in the form to discover your next delicious meal.
            </p>
        </div>
    );
};

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipes, isLoading, error }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert message={error} />;
  }

  if (!recipes) {
    return <InitialState />;
  }
  
  if (recipes.length === 0) {
    return <Alert message="No recipes could be generated with the given ingredients. Please try again." />
  }

  return (
    <div className="space-y-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeDisplay;
