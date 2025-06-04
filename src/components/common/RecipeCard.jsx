import {useState} from 'react';
import {useAuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import MessageBox from "./MessageBox";
import './RecipeCard.css';
import PropTypes from 'prop-types';

const RecipeCard = ({recipe, onClick, onRemoveFavorite, showRemoveButton = false}) => {
    const {isAuthenticated} = useAuthContext();
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            e.preventDefault();
            setShowError(true);
            return;
        }
    };

    const handleViewRecipeClick = () => {
        if (onClick) {
            onClick(recipe.id);
        } else {
            // Default behavior: navigate to recipe details
            navigate(`/recipe/${recipe.id}`);
        }
    };

    const handleRemoveFavoriteClick = (e) => {
        e.stopPropagation();
        if (onRemoveFavorite) {
            onRemoveFavorite(recipe.id);
        }
    };

    // Prepare the recipe object for FavoriteButton
    const favoriteButtonRecipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount,
        readyInMinutes: recipe.readyInMinutes || 0,
        servings: recipe.servings
    };

    return (
        <div className="recipe-card">
            <div className="recipe-image-container">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                />

                {/* Show FavoriteButton only when not in remove mode */}
                {!showRemoveButton && (
                    <FavoriteButton
                        recipe={favoriteButtonRecipe}
                        className="card-favorite"
                        onClick={handleFavoriteClick}
                    />
                )}

                {/* Show the authentication error message */}
                {showError && (
                    <MessageBox
                        message="Log in to add recipes to your favorites."
                        type="error"
                        onClose={() => setShowError(false)}
                        positioned="absolute"
                    />
                )}
            </div>

            <div className="recipe-info">
                <h3 className="recipe-title">{recipe.title}</h3>

                <div className="recipe-stats">
                    <div className="stat">
                        <span className="stat-label">Used ingredients:</span>
                        <span className="stat-value">{recipe.usedIngredientCount}</span>
                    </div>

                    <div className="stat">
                        <span className="stat-label">Missing ingredients:</span>
                        <span className="stat-value">{recipe.missedIngredientCount}</span>
                    </div>

                    {recipe.readyInMinutes && (
                        <div className="stat">
                            <span className="stat-label">Prep time:</span>
                            <span className="stat-value">{recipe.readyInMinutes} min</span>
                        </div>
                    )}
                </div>

                {/* View recipe button - main action */}
                <button
                    onClick={handleViewRecipeClick}
                    className="view-recipe-button"
                    type="button"
                >
                    View recipe
                </button>

                {/* Remove from the favorite button - only shown on the favorite page */}
                {showRemoveButton && (
                    <button
                        onClick={handleRemoveFavoriteClick}
                        className="remove-favorite-text-button"
                        type="button"
                    >
                        Remove from favorites
                    </button>
                )}
            </div>
        </div>
    );
};

// PropTypes for RecipeCard component
RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        usedIngredientCount: PropTypes.number.isRequired,
        missedIngredientCount: PropTypes.number.isRequired,
        readyInMinutes: PropTypes.number,
        servings: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func,
    onRemoveFavorite: PropTypes.func,
    showRemoveButton: PropTypes.bool
};

export default RecipeCard;