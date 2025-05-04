import { useState } from 'react';
import './SearchRecipes.css';

function SearchRecipes() {
    // Basis state voor ingrediënten en zoekresultaten
    const [ingredients, setIngredients] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Handler voor het formulier
    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier komt later de zoekfunctie
        console.log('Zoeken naar recepten met:', ingredients);
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
                <p>Enter ingredients to search for recipes.</p>
            </div>
        </div>
    );
}

export default SearchRecipes;
