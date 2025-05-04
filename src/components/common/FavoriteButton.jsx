import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './FavoriteButton.css';

function FavoriteButton({ recipe, className, showText = false }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (recipe) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
            setIsFavorite(isAlreadyFavorite);
        }
    }, [recipe]);

    const toggleFavorite = (e) => {
        e.stopPropagation();

        if (!recipe) return;

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            const recipeToSave = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                readyInMinutes: recipe.readyInMinutes,
                servings: recipe.servings || 4
            };
            const updatedFavorites = [...favorites, recipeToSave];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
    };

    return (
        <button
            className={`favorite-button ${className || ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? (
                <>
                    <FaHeart className="heart-icon filled" />
                    {showText && <span>SAVED</span>}
                </>
            ) : (
                <>
                    <FaRegHeart className="heart-icon" />
                    {showText && <span>SAVE RECIPE</span>}
                </>
            )}
        </button>
    );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    readyInMinutes: PropTypes.number.isRequired,
    servings: PropTypes.number
  }),
  className: PropTypes.string,
  showText: PropTypes.bool
};

export default FavoriteButton;