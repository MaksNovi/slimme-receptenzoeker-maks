import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchRecipes.css';
import SearchBar from "../components/common/SearchBar.jsx";
import RecipeCard from "../components/common/RecipeCard.jsx";
import { searchRecipesByIngredients } from '../services/SpoonacularService';

function SearchRecipes() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchIngredients) => {
        if(!searchIngredients.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const formattedIngredients = searchIngredients
                .split(',')
                .map(i => i.trim())
                .join(',');

            const results = await searchRecipesByIngredients(formattedIngredients);
            setSearchResults(results);
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
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

            {isLoading && <div className="loading">Loading recipes...</div>}

            {error && <div className="error">{error}</div>}

            {!isLoading && !error && searchResults.length > 0 && (
                <div className="results-container" aria-live="polite">
                    <h3 className="results-title">Recipes found</h3>
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
            )}

            {!isLoading && !error && searchResults.length === 0 && (
                <div>No recipes found with these ingredients.</div>
            )}
        </div>
    );

}

export default SearchRecipes;
