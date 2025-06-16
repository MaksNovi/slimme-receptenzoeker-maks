const API_KEY = '7f951807316d4fa5b643073d5a8dcc7f';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipesByIngredients = async (ingredients, options = {}) => {
    try {
        const params = new URLSearchParams({
            apiKey: API_KEY,
            number: options.number || 100,
            offset: options.offset || 0,
            addRecipeInformation: true,
            fillIngredients: true,
            ranking: 1,
        });

        const cleanedIngredients = ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(Boolean)
            .join(',');

        if (cleanedIngredients) {
            params.append('includeIngredients', cleanedIngredients);
        } else {
            // Don't perform a search if no ingredients are provided
            return {results: [], totalResults: 0};
        }

        // Dynamically add all provided filters to the request
        if (options.cuisine) {
            params.append('cuisine', options.cuisine);
        }
        if (options.diet) {
            params.append('diet', options.diet);
        }
        if (options.maxReadyTime) {
            params.append('maxReadyTime', options.maxReadyTime);
        }
        if (options.type) {
            params.append('type', options.type);
        }

        const url = `${BASE_URL}/recipes/complexSearch?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 402) {
                throw new Error('apiKey is invalid or has exceeded its usage limit. Please check your API key.');
            }
            // Throw a more generic error for other status codes
            throw new Error(`API-error with status: ${response.status}`);
        }

        const data = await response.json();

        // Return the results and totalResults, ensuring they are defined
        return {
            results: data.results || [],
            totalResults: data.totalResults || 0,
        };
    } catch (error) {
        console.error('Error when retrieving recipes:', error);
        throw error;
    }
};

export const getRecipeDetails = async (recipeId) => {
    try {
        const params = new URLSearchParams({
            apiKey: API_KEY,
            includeNutrition: true,
        });

        const url = `${BASE_URL}/recipes/${recipeId}/information?${params.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API-error with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error when retrieving recipe details:', error);
        throw error;
    }
};

export const getPopularRecipes = async (options = {}) => {
    try {
        const params = new URLSearchParams({
            apiKey: API_KEY,
            number: options.number || 12,
        });

        if (options.tags) {
            params.append('tags', options.tags);
        }

        const url = `${BASE_URL}/recipes/random?${params.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API-error with status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipes || [];
    } catch (error) {
        console.error('Error with retrieving popular recipes:', error);
        throw error;
    }
};