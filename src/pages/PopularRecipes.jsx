import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/common/RecipeCard.jsx';
import { getPopularRecipes } from '../services/SpoonacularService';
import './PopularRecipes.css';

function PopularRecipes() {
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopularRecipes = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getPopularRecipes();
                setPopularRecipes(data);
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
                console.error('Error fetching popular recipes:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPopularRecipes();
    }, []);

    const navigateToRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

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
                <div className="recipe-grid">
                    {popularRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => navigateToRecipe(recipe.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PopularRecipes;