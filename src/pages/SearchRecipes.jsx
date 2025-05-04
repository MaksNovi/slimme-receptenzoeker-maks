import { useState } from 'react';
import './SearchRecipes.css';

function SearchRecipes() {
    // Basis state voor ingrediënten en zoekresultaten
    const [ingredients, setIngredients] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchRecipes = async (ingredientsList) => {
        if (!ingredientsList.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            // Gebruik je eigen API key hier
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

    // Handler voor het formulier
    const handleSubmit = (e) => {
        e.preventDefault();
        if(ingredients.trim()) searchRecipes(ingredients);
    };

    return (
        <div className="search-recipes-page">
            <div className="search-container">
                <h2>Search for recipes by ingredients</h2>
                <p className="search-description">
                    Enter the ingredients you have at home, separated by commas, and find recipes you can make with them.
                </p>

                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Example, chicken, rice, broccoli"
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            <div className="results-container">
                {isLoading ? (
                    <div className="loading">Loading recipes...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : searchResults.length > 0 ? (
                    <div className="recipe-grid">
                        {searchResults.map(recipe => (
                            <div key={recipe.id} className="recipe-card">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="recipe-image"
                                />
                                <div className="recipe-info">
                                    <h3 className="recipe-title">{recipe.title}</h3>
                                    <div className="recipe-stats">
                                        <span>Ingredients used: {recipe.usedIngredientCount}</span>
                                        <span>Missing ingredients: {recipe.missedIngredientCount}</span>
                                    </div>
                                    <button className="view-recipe-button">
                                        View recipe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Please enter the ingredients you have to search for recipes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchRecipes;
