import {useEffect, useState} from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';
import './FavoriteButton.css';

const FavoriteButton = ({recipe, className = '', showText = false}) => {
    const {isAuthenticated} = useAuthContext();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    // Check if the recipe is in favorites when component mounts or recipe changes
    useEffect(() => {
        if (recipe && isAuthenticated) {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
            setIsFavorite(isAlreadyFavorite);
        } else {
            setIsFavorite(false);
        }
    }, [recipe, isAuthenticated]);

    // Listen for logout event to reset state
    useEffect(() => {
        const handleLogout = () => {
            setIsFavorite(false);
            setShowLoginMessage(false);
        };

        window.addEventListener('userLogout', handleLogout);

        return () => {
            window.removeEventListener('userLogout', handleLogout);
        };
    }, []);

    const toggleFavorite = (e) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            setShowLoginMessage(true);
            return;
        }

        if (!recipe) return;

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            // Add to favorites
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
        <>
            <button
                className={`favorite-button ${className} ${isFavorite ? 'favorite' : ''}`}
                onClick={toggleFavorite}
                type="button"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? (
                    <FaHeart className="heart-icon filled" aria-hidden="true"/>
                ) : (
                    <FaRegHeart className="heart-icon" aria-hidden="true"/>
                )}
                {showText && (
                    <span className="favorite-text">
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </span>
                )}
            </button>

            {showLoginMessage && (
                <MessageBox
                    message="Log in to add recipes to your favorites."
                    type="warning"
                    onClose={() => setShowLoginMessage(false)}
                    positioned="absolute"
                />
            )}
        </>
    );
};

FavoriteButton.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        usedIngredientCount: PropTypes.number.isRequired,
        missedIngredientCount: PropTypes.number.isRequired,
        readyInMinutes: PropTypes.number,
        servings: PropTypes.number
    }).isRequired,
    className: PropTypes.string,
    showText: PropTypes.bool
};

export default FavoriteButton;
