import {useState} from 'react';
import {useAuthContext} from "../../contexts/AuthContext.js";
import {useNavigate} from "react-router-dom";
import FavoriteButton from "./FavoriteButton.js";
import MessageBox from "./MessageBox";
import './RecipeCard.css';

interface Recipe {
    id: number;
    image: string;
    title: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    readyInMinutes?: number;
    servings?: number;
}

interface RecipeCardProps {
    recipe: Recipe;
    onClick?: (id: number) => void;
    onRemoveFavorite?: (id: number) => void;
    showRemoveButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
                                                   recipe,
                                                   onClick,
                                                   onRemoveFavorite,
                                                   showRemoveButton = false
                                               }) => {
    const {isAuthenticated} = useAuthContext();
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            navigate(`/recipe/${recipe.id}`);
        }
    };

    const handleRemoveFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (onRemoveFavorite) {
            onRemoveFavorite(recipe.id);
        }
    }

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
                        onClick={handleFavoriteClick}
                    />
                )}

                {showError && (
                    <MessageBox
                        message={"Log in to add recipes to your favorites."}
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

                <button
                    onClick={() => onClick(recipe.id)}
                    className="view-recipe-button"
                >
                    View recipe
                </button>

                {showRemoveButton && (
                    <button
                        onClick={handleRemoveFavoriteClick}
                        className="remove-favorite-text-button"
                    >
                        Remove from favorites
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecipeCard;