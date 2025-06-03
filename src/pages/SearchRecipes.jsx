import {useCallback, useEffect, useRef, useState} from 'react';
import {searchRecipesByIngredients} from '../services/SpoonacularService';
import {useSearch} from '../contexts/SearchContext.tsx';
import SearchBar from "../components/common/SearchBar.tsx";
import RecipeList from "../components/common/RecipeList.jsx";
import './SearchRecipes.css';

function SearchRecipes() {
    const {hasSearched, searchTerm, searchResults, updateSearch, currentPage} = useSearch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasRestoredSearch = useRef(false);

    const handleSearch = useCallback(async (searchIngredients) => {
        setIsLoading(true);
        setError(null);

        try {
            const formattedIngredients = searchIngredients
                .split(',')
                .map(i => i.trim())
                .join(',');

            const data = await searchRecipesByIngredients(formattedIngredients, {
                number: 100, // Fetch more results for pagination
                offset: 0,
            });

            updateSearch(searchIngredients, data.results);
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
            // Update search results to empty if an error occurs to prevent infinite loop
            updateSearch(searchIngredients, []);
        } finally {
            setIsLoading(false);
        }
    }, [updateSearch]);

    // Restore search results if the search was performed before
    useEffect(() => {
        if (hasSearched && searchTerm && searchResults.length === 0 && !hasRestoredSearch.current) {
            hasRestoredSearch.current = true;
            handleSearch(searchTerm).catch(err => {
                console.error('Error restoring search:', err);
            });
        }

    }, [hasSearched, searchTerm, searchResults.length, handleSearch]);

    // Ref to track if search has been restored
    useEffect(() => {
        hasRestoredSearch.current = false;
    }, [searchTerm]);

    const recipesPerPage = 12;
    const totalPages = Math.ceil(searchResults.length / recipesPerPage);

    return (
        <div className="search-recipes-page">
            <div className="search-container">
                <h2>Search for recipes by ingredients</h2>

                <p className="search-description">
                    Enter the ingredients you have at home, separated by commas, and find recipes you can make with them.
                </p>

                <SearchBar onSearch={handleSearch}/>
            </div>

            {isLoading && <div className="loading">Loading recipes...</div>}

            {error && <div className="error">{error}</div>}

            {!isLoading && !error && searchResults.length > 0 && (
                <div className="results-container" aria-live="polite">
                    <h3 className="results-title">
                        Found {searchResults.length} recipe{searchResults.length > 1 ? 's' : ''} for &#34;{searchTerm}&#34;

                        (Page {currentPage} of {totalPages})
                    </h3>

                    <RecipeList recipes={searchResults}/>
                </div>
            )}

            {!isLoading && !error && hasSearched && searchResults.length === 0 && (
                <div>No recipes found with these ingredients.</div>
            )}
        </div>
    );

}

export default SearchRecipes;
