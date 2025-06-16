import {useCallback, useEffect, useRef, useState} from 'react';
import {useSearch} from '../contexts/SearchContext';
import {searchRecipesByIngredients} from '../services/SpoonacularService';
import SearchBar from '../components/common/SearchBar';
import RecipeList from '../components/common/RecipeList';
import FilterPanel from "../components/filters/FilterPanel.jsx";
import './SearchRecipes.css';

function SearchRecipes() {
    // Retrieve the global state and functions from the SearchContext
    const {
        searchTerm,
        searchResults,
        updateSearch,
        hasSearched,
        filters
    } = useSearch();

    // // Local state for loading and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // // Refs to keep state between renders without triggering a new render
    const isMounted = useRef(false); // Tracks whether the component has passed its first render

    /**
     * Central function to perform searches.
     * Uses useCallback for performance optimization, so the function is not recreated on every render.
     */
    const performSearch = useCallback(async (ingredientsToSearch, currentFilters) => {
        // Don't perform a search if the input is empty
        if (!ingredientsToSearch?.trim()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // The ingredientsToSearch parameter is the raw string input from the user.
            const data = await searchRecipesByIngredients(ingredientsToSearch, currentFilters);
            updateSearch(ingredientsToSearch, data.results || []);
        } catch (err) {
            setError(`Search failed: ${err.message}. Try again later, or check your API key`);
            updateSearch(ingredientsToSearch, []); // Reset search results on error
        } finally {
            setIsLoading(false);
        }
    }, [updateSearch]); // Dependencies: only recreate this function if updateSearch changes

    /**
     * Callback function to handle search input from the SearchBar component.
     */
    const handleSearch = useCallback(async (newSearchTerm) => {
        await performSearch(newSearchTerm, filters);
    }, [performSearch, filters]);

    /**
     * Effect to handle changes in filters and search term.
     */
    useEffect(() => {
        // Prevent running on the very first render
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        // Only perform a search if a term has been entered
        if (searchTerm) {
            performSearch(searchTerm, filters);
        }
    }, [filters, searchTerm, performSearch]); // Listens to changes in filters and searchTerm

    const hasActiveFilters = Boolean(filters.cuisine);

    return (
        <div className="search-recipes-page">
            <div className="search-container">
                <h2>Search recipes with the ingredients you have at home</h2>
                <p className="search-description">
                    Enter the ingredients you have, separated by commas, and find delicious recipes instantly.
                </p>

                <SearchBar onSearch={handleSearch} placeholder="Chicken, rice, broccoli"/>

                <div className="filter-controls">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`filter-toggle-btn ${hasActiveFilters ? 'has-filters' : ''}`}
                        aria-expanded={showFilters}
                    >
                        {showFilters ? 'Hide filters' : 'Show filters'}
                        {hasActiveFilters && <span className="filter-indicator" aria-label="Active filters">●</span>}
                    </button>
                </div>

                {showFilters && <FilterPanel/>}
            </div>

            <div className="results-feedback">
                {isLoading && (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <p>Loading recipes...</p>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}

                {!isLoading && !error && hasSearched && searchResults.length === 0 && (
                    <div className="no-results">
                        <p>No recipes found &#34;{searchTerm}&#34;. Try other ingredients or adjust the filters.</p>
                    </div>
                )}
            </div>

            {!isLoading && !error && searchResults.length > 0 && (
                <div className="results-container" aria-live="polite">
                    <h3 className="results-title">
                        {searchResults.length} recipes {searchResults.length > 1 ? '' : ''} found
                        {filters.cuisine && ` in the ${filters.cuisine} cuisine`}
                    </h3>
                    <RecipeList recipes={searchResults}/>
                </div>
            )}
        </div>
    );
}

export default SearchRecipes;
