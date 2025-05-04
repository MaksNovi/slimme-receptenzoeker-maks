const API_KEY = '990f11f392dd4965a2863739f4ce2f1b';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipesByIngredients = async (ingredients, options = {}) => {
    try {
        const { ignorePantry = true, number = 12, ranking = 1 } = options;

        const url = `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=${number}&ranking=${ranking}&ignorePantry=${ignorePantry}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        return await response.json();
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