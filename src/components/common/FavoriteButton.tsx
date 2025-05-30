import {useEffect, useState} from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import './FavoriteButton.css';

interface FavoriteButtonProps {
    recipe: {
        id: number;
        title: string;
        image: string;
        usedIngredientCount: number;
        missedIngredientCount: number;
        readyInMinutes?: number;
        servings?: number;
    };
    className?: string;
    showText?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({recipe, className, showText = false, onClick}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (recipe) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
            setIsFavorite(isAlreadyFavorite);
        }
    }, [recipe]);

    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (onClick) {
            onClick(e);

            if (e.defaultPrevented) {
                return;
            }
        }

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
                usedIngredientCount: recipe.usedIngredientCount,
                missedIngredientCount: recipe.missedIngredientCount,
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
                <FaHeart className="heart-icon filled" />
            ) : (
                <FaRegHeart className="heart-icon" />
            )}
            {showText && (isFavorite ? 'Remove from Favorites' : 'Add to Favorites')}
        </button>
    );
}

export default FavoriteButton;