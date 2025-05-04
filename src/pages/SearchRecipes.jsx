import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchRecipes.css';
import SearchBar from "../components/common/SearchBar.jsx";
import RecipeCard from "../components/common/RecipeCard.jsx";

function SearchRecipes() {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchRecipes = async (ingredientsList) => {
        if (!ingredientsList.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const apiKey = 'fe3dc1f83f014d92bd65f14f401ce259';
            const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsList}&number=12&ranking=1&ignorePantry=true`;

            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            setError('There was an error retrieving the recipes.');
            console.error('Error searching for recipes:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (ingredientsList) => {
        setIngredients(ingredientsList);
        searchRecipes(ingredientsList);
    };

    const navigateToRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="search-recipes-page">
            <div className="search-container">
                <h2>Search for recipes by ingredients</h2>
                <p className="search-description">
                    Enter the ingredients you have at home, separated by commas, and find recipes you can make with them.
                </p>

                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="results-container" aria-live="polite">
                        <h3 className="results-title">Found recipes</h3>
                        <div className="recipe-grid">
                            {searchResults.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onClick={navigateToRecipe}
                                />
                            ))}
                        </div>
            </div>
        </div>
    );
}

export default SearchRecipes;
