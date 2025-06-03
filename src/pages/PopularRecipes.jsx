import {useEffect, useState} from 'react';
import {getPopularRecipes} from '../services/SpoonacularService';
import {useSearch} from "../contexts/SearchContext.js";
import RecipeList from "../components/common/RecipeList.tsx";
import './PopularRecipes.css';

function PopularRecipes() {
    const {setPreviousPage} = useSearch(); // Get the function to set the previous page for navigation
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPreviousPage('/popular-recipes'); // Set the previous page for navigation

        const cachedRecipes = localStorage.getItem('popular-recipes');
        if (cachedRecipes) {
            setPopularRecipes(JSON.parse(cachedRecipes));
            setIsLoading(false);
            return;
        }

        const fetchPopularRecipes = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getPopularRecipes();
                setPopularRecipes(data);
                localStorage.setItem('popular-recipes', JSON.stringify(data));
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
                console.error('Error fetching popular recipes:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPopularRecipes();
    }, []);

    return (
        <div className="popular-recipes-page">
            <div className="popular-recipes-header">
                <h1 className="page-title">Popular Recipes</h1>
                <p className="page-description">
                    Discover our most popular recipes loved by our community. These recipes are perfect for any occasion and guaranteed to impress.
                </p>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading popular recipes...</p>
                </div>
            ) : error ? (
                <div className="error-message-recipes">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Try Again
                    </button>
                </div>
            ) : (
                <div className="popular-recipes-content">
                    {popularRecipes.length === 0 ? (
                        <p className="no-recipes-message">No popular recipes found at the moment.</p>
                    ) : (
                        <RecipeList recipes={popularRecipes}/>
                    )}
                </div>
            )}
        </div>
    );
}

export default PopularRecipes;