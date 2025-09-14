
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getComplexityString = (level: number): string => {
  if (level <= 33) return 'Simple (quick and easy, minimal steps)';
  if (level <= 66) return 'Medium (requires some cooking skills and time)';
  return 'Complex (for experienced cooks, may involve advanced techniques)';
};

export const generateRecipes = async (
  ingredients: string,
  complexity: number,
  cuisine: string,
  isPopular: boolean
): Promise<Recipe[]> => {
  const complexityDescription = getComplexityString(complexity);
  const prompt = `
    You are an expert culinary assistant. Your task is to generate one or two creative and delicious recipes based on the user's criteria.

    **Criteria:**
    - **Available Ingredients:** ${ingredients}. You can assume basic pantry staples like salt, pepper, oil, and water are available. Do not list these staples in the ingredients section unless a specific type or amount is crucial (e.g., '1 tbsp olive oil').
    - **Desired Complexity:** ${complexityDescription}.
    - **Cuisine Preference:** ${cuisine || 'Any cuisine is fine'}.
    - **Popularity:** ${isPopular ? 'Please suggest popular or well-loved recipes.' : 'Feel free to suggest unique or creative recipes.'}

    **Output Format:**
    Please provide the output in a structured JSON array, where each object represents a single recipe. Ensure the JSON is valid and strictly adheres to the provided schema.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: {
          type: Type.STRING,
          description: 'The title of the recipe.',
        },
        description: {
          type: Type.STRING,
          description: 'A short, enticing description of the dish.',
        },
        ingredients: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'A list of all necessary ingredients with quantities (e.g., "1 cup of flour").',
        },
        instructions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Numbered, step-by-step cooking instructions.',
        },
      },
      required: ['recipeName', 'description', 'ingredients', 'instructions'],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.75,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("The model returned an empty response. Please try adjusting your ingredients.");
    }

    const parsedRecipes: Recipe[] = JSON.parse(jsonText);
    return parsedRecipes;

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes. The model may have had trouble with your request. Please try again with different ingredients or options.");
  }
};
