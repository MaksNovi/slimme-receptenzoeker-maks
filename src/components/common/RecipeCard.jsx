import {useNavigate} from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import PropTypes from 'prop-types';
import './RecipeCard.css';

const RecipeCard = ({recipe, onClick, onRemoveFavorite, showRemoveButton = false}) => {
    const navigate = useNavigate();

    const handleViewRecipeClick = () => {
        if (onClick) {
            onClick(recipe.id);
        } else {
            navigate(`/recipe/${recipe.id}`);
        }
    };

    const handleRemoveFavoriteClick = (e) => {
        e.stopPropagation();
        if (onRemoveFavorite) {
            onRemoveFavorite(recipe.id);
        }
    };

    // Prepare recipe object for FavoriteButton
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

                {!showRemoveButton && (
                    <FavoriteButton
                        recipe={favoriteButtonRecipe}
                        className="card-favorite"
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

                <button
                    onClick={handleViewRecipeClick}
                    className="view-recipe-button"
                    type="button"
                >
                    View recipe
                </button>

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