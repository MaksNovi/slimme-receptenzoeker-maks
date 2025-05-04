import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';
import {useEffect, useState} from "react";
import {getRecipeDetails} from "../services/SpoonacularService.js";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getRecipeDetails(id);
                setRecipe(data);
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Recipe loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={() => navigate('/search-results')} className="back-button">
                    Back to search results
                </button>
            </div>
        );
    }

    if (!recipe) {
        return null;
    }

    return (
        <div className="recipe-details-page">
            <div className="recipe-details-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    Back to search results
                </button>

                <button className="save-recipe-button">
                    Save recipe
                </button>
            </div>

            <div className="recipe-main">
                <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                </div>

                <h1 className="recipe-title">{recipe.title}</h1>

                <div className="recipe-meta">
                    <div className="recipe-meta-item">
                        <span>Prep time: {recipe.readyInMinutes} minutes</span>
                    </div>
                    <div className="recipe-meta-item">
                        <span>Rating: {recipe.spoonacularScore ? (recipe.spoonacularScore / 20).toFixed(1) : '4.5'}</span>
                    </div>
                </div>

                <p className="recipe-description">
                    {recipe.summary && (
                        <span dangerouslySetInnerHTML={{ __html: recipe.summary.split('. ')[0] + '.' }} />
                    )}
                </p>
            </div>
        </div>
    );
}

export default RecipeDetails;