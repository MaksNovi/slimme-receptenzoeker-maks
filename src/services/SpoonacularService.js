const API_KEY = '9da7c25f2fb947788fdc3b3c5101196e';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipesByIngredients = async (ingredients, options = {}) => {
    try {
        const {
            number = 100,
            offset = 0,
            addRecipeInformation = true,
            fillIngredients = true,
            cuisine
        } = options;

        // use complexSearch endpoint for consistency
        let url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}`;

        // Clean and format ingredients properly
        const cleanedIngredients = ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0)
            .join(',');

        console.log('🔍 Cleaned ingredients:', cleanedIngredients);

        //  Use includeIngredients parameter for ingredient-based search
        url += `&includeIngredients=${encodeURIComponent(cleanedIngredients)}`;
        url += `&number=${number}`;
        url += `&offset=${offset}`;
        url += `&addRecipeInformation=${addRecipeInformation}`;
        url += `&fillIngredients=${fillIngredients}`;

        // Add ranking for better ingredient matching
        url += `&ranking=1`; // Maximize used ingredients

        // Add cuisine filter when provided
        if (cuisine) {
            url += `&cuisine=${encodeURIComponent(cuisine)}`;
        }

        console.log('🔍 Final API URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 402) {
                throw new Error('API quota exceeded. Please check your Spoonacular account.');
            }
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(' API Response:', data);

        return {
            results: data.results || [],
            totalResults: data.totalResults || 0,
            hasMoreResults: (offset + number) < (data.totalResults || 0)
        };
    } catch (error) {
        console.error('Error searching recipes:', error);
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