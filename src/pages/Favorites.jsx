import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import "./Favorites.css"

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const favs = localStorage.getItem("favorites");

        if(favs) {
            setFavorites(JSON.parse(favs));
        }
    }, []);

    const handleViewDetails = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    }

    const handleRemoveFavorite = (recipeId) => {
        const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    return (
        <div className="favorites-page">
            <h1>My favorites recipes</h1>
            {favorites.length === 0 ? (
                <p>You have no favorite recipes yet. Start adding some!</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((recipe) => (
                        <div key={recipe.id} className="favorite-card">
                            <img src={recipe.image} alt={recipe.title} className="favorite-image" />
                            <div className="favorite-card-content">
                                <h2 className="favorite-title">{recipe.title}</h2>
                                <div className="favorite-card-actions">
                                    <button
                                        className="details-btn"
                                        onClick={() => handleViewDetails(recipe.id)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleRemoveFavorite(recipe.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites;