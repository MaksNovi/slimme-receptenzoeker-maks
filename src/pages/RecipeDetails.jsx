import {useNavigate, useParams} from 'react-router-dom';
import './RecipeDetails.css';
import {useEffect, useState} from "react";
import {getRecipeDetails} from "../services/SpoonacularService.js";
import FavoriteButton from "../components/common/FavoriteButton.jsx";

function RecipeDetails() {
    const {id} = useParams();
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
            <div className="recipe-details-flex">
                <div className="recipe-content">
                    <img className="recipe-image" src={recipe.image} alt={recipe.title}/>
                    <div className="recipe-description">
                        <h2 className="recipe-title">{recipe.title}</h2>
                        <p className="recipe-summary">
                            {recipe.summary && (
                                <span dangerouslySetInnerHTML={{__html: recipe.summary}}/>
                            )}
                        </p>
                    </div>
                </div>

                <div className="recipe-sidecard">
                    <div className="button-container">
                        <button ><FavoriteButton
                            recipe={recipe}
                            className="save-btn"
                            showText={true}
                        /></button>

                        <button className="back-btn" onClick={() => navigate(-1)}>Back to Search</button>
                    </div>

                    <div>
                        <div className="sidecard-section-title">Ingredients</div>
                        <ul className="ingredient-list">
                            {recipe.extendedIngredients.map(ing => (
                                <li key={ing.id}>{ing.original}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="sidecard-section-title">Instructions</div>
                        <ul className="instructions-list">
                            {recipe.analyzedInstructions.length > 0 ? (
                                recipe.analyzedInstructions[0].steps.map(step => (
                                    <li key={step.number}>{step.step}</li>
                                ))
                            ) : (
                                <li>{recipe.instructions}</li>
                            )}
                        </ul>
                    </div>

                    <div className="recipe-meta-row">
                    <span className="recipe-meta">
                        <span role="img" aria-label="clock">⏱️</span>
                        Cooking Time: {recipe.readyInMinutes} mins
                    </span>
                        <span className="recipe-meta">
                        <span className="star" role="img" aria-label="star">★</span>
                        Rating: {recipe.spoonacularScore
                            ? (recipe.spoonacularScore / 20).toFixed(1)
                            : '4.5'
                        }
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;