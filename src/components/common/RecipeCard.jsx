import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './RecipeCard.css';
import {useEffect, useState} from "react";

function RecipeCard({ recipe, onClick }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
        setIsFavorite(isAlreadyFavorite);
    }, [recipe.id]);

    const toggleFavorite = (e) => {
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if(isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            const updatedFavorites = [...favorites, recipe];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
    };

    return (
        <div className="recipe-card">
            <div className="recipe-image-container">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                />
                <button
                    className="favorite-button"
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <FaHeart className="favorite-icon" /> : <FaRegHeart className="favorite-icon" />}
                </button>
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

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    usedIngredientCount: PropTypes.number.isRequired,
    missedIngredientCount: PropTypes.number.isRequired,
    readyInMinutes: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default RecipeCard;