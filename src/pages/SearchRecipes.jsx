import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchRecipesByIngredients} from '../services/SpoonacularService';
import SearchBar from "../components/common/SearchBar.jsx";
import RecipeCard from "../components/common/RecipeCard.tsx";
import './SearchRecipes.css';
import Pagination from "../components/common/Pagination.js";

function SearchRecipes() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const RECIPES_PER_PAGE = 12;


    const handleSearch = async (searchIngredients, page = 1) => {
        if(!searchIngredients.trim()) return;

        setIsLoading(true);
        setError(null);
        setCurrentSearch(searchIngredients);

        try {
            const formattedIngredients = searchIngredients
                .split(',')
                .map(i => i.trim())
                .join(',');

            const offset = (page - 1) * RECIPES_PER_PAGE;
            const data = await searchRecipesByIngredients(formattedIngredients, {
                number: RECIPES_PER_PAGE,
                offset: offset,
            });

            setSearchResults(data.results);
            setHasMore(data.hasMoreResults);
            setCurrentPage(page);

            if (data.hasMoreResults) {
                setTotalPages(page + 1);
            } else {
                setTotalPages(page);
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (currentSearch) {
            handleSearch(currentSearch, page);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

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

                <SearchBar onSearch={(ingredients) => handleSearch(ingredients, 1)}/>
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

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        hasMore={hasMore}
                    />
                </div>
            )}

            {!isLoading && !error && searchResults.length === 0 && (
                <div>No recipes found with these ingredients.</div>
            )}
        </div>
    );

}

export default SearchRecipes;
