
import React from 'react';

interface RecipeFormProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  complexity: number;
  setComplexity: (value: number) => void;
  cuisine: string;
  setCuisine: (value: string) => void;
  isPopular: boolean;
  setIsPopular: (value: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const Button: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-primary hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
    >
        {children}
    </button>
);

const Spinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const RecipeForm: React.FC<RecipeFormProps> = ({
  ingredients,
  setIngredients,
  complexity,
  setComplexity,
  cuisine,
  setCuisine,
  isPopular,
  setIsPopular,
  onSubmit,
  isLoading,
}) => {
  const getComplexityLabel = (value: number) => {
    if (value <= 33) return 'Simple';
    if (value <= 66) return 'Medium';
    return 'Complex';
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">
          Available Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken breast, broccoli, garlic"
          className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary transition-shadow"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-gray-700 text-sm font-bold mb-2">
          Cuisine Type (optional)
        </label>
        <input
          id="cuisine"
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="e.g., Italian, Mexican, Thai"
          className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="complexity" className="block text-gray-700 text-sm font-bold mb-2">
          Recipe Complexity: <span className="text-primary font-semibold">{getComplexityLabel(complexity)}</span>
        </label>
        <input
          id="complexity"
          type="range"
          min="1"
          max="100"
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Simple</span>
          <span>Medium</span>
          <span>Complex</span>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isPopular"
          type="checkbox"
          checked={isPopular}
          onChange={(e) => setIsPopular(e.target.checked)}
          className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
        />
        <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900">
          Suggest Popular Recipes
        </label>
      </div>
      
      <Button onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (
            <>
                <Spinner />
                Generating...
            </>
        ) : "Generate Recipes"}
      </Button>

    </form>
  );
};

export default RecipeForm;
