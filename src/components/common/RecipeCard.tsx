import {useState} from 'react';
import {useAuthContext} from "../../contexts/AuthContext.js";
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
}

const RecipeCard: React.FC<RecipeCardProps> = ({recipe, onClick}) => {
    const {isAuthenticated} = useAuthContext();
    const [showError, setShowError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            e.preventDefault();
            setShowError(true);
            return;
        }
    };

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

                <FavoriteButton
                    recipe={favoriteButtonRecipe}
                    className="card-favorite"
                    onClick={handleFavoriteClick}
                />

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
            </div>
        </div>
    );
}

export default RecipeCard;