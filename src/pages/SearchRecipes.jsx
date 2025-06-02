import {useState} from 'react';
import {searchRecipesByIngredients} from '../services/SpoonacularService';
import SearchBar from "../components/common/SearchBar.tsx";
import RecipeList from "../components/common/RecipeList.jsx";
import './SearchRecipes.css';

function SearchRecipes() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSearch, setCurrentSearch] = useState('');

    const handleSearch = async (searchIngredients) => {
        if(!searchIngredients.trim()) return;

        setIsLoading(true);
        setError(null);
        setCurrentSearch(searchIngredients);

        try {
            const formattedIngredients = searchIngredients
                .split(',')
                .map(i => i.trim())
                .join(',');

            const data = await searchRecipesByIngredients(formattedIngredients, {
                number: 100, // Fetch more results for pagination
                offset: 0,
            });

            setSearchResults(data.results);
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-recipes-page">
            <div className="search-container">
                <h2>Search for recipes by ingredients</h2>
                <p className="search-description">
                    Enter the ingredients you have at home, separated by commas, and find recipes you can make with them.
                </p>

                <SearchBar onSearch={(ingredients) => handleSearch(ingredients, 1)}/>
            </div>

            {isLoading && <div className="loading">Loading recipes...</div>}

            {error && <div className="error">{error}</div>}

            {!isLoading && !error && searchResults.length > 0 && (
                <div className="results-container" aria-live="polite">
                    <h3 className="results-title">Found {searchResults.length} recipes
                        for &quot;{currentSearch}&quot;</h3>

                    <RecipeList recipes={searchResults}/>
                </div>
            )}

            {!isLoading && !error && searchResults.length === 0 && (
                <div>No recipes found with these ingredients.</div>
            )}
        </div>
    );

}

export default SearchRecipes;
