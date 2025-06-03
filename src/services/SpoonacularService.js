const API_KEY = '9da7c25f2fb947788fdc3b3c5101196e';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipesByIngredients = async (ingredients, options = {}) => {
    try {
        const { ignorePantry = true, number = 12, ranking = 1 } = options;

        const url = `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=${number}&ranking=${ranking}&ignorePantry=${ignorePantry}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const results = await response.json();

        return {
            results,
            totalResults: results.length,
            hasMoreResults: results.length === number
        };
    } catch (error) {
        console.error('Error searching recipes by ingredients:', error);
        throw error;
    }
};

export const getRecipeDetails = async (recipeId) => {
    try {
        const url = `${BASE_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};

export const getPopularRecipes = async (options = {}) => {
    try {
        const { number = 12, tags = '' } = options;

        const url = `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}&tags=${tags}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching popular recipes:', error);
        throw error;
    }
};