import {useEffect, useState} from "react"
import RecipeList from "../components/common/RecipeList.jsx"
import "./Favorites.css"

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = localStorage.getItem("favorites");

        if(favs) {
            setFavorites(JSON.parse(favs));
        }
    }, []);

    const handleRemoveFavorite = (id: number) => {
        const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-page">
            <h1>My favorites recipes</h1>
            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <p>You have no favorite recipes yet. Start adding some!</p>
                </div>
            ) : (
                <div className="favorites-content">
                    <p className="favorites-count">You have {favorites.length} favorite
                        recipe{favorites.length !== 1 ? 's' : ''}</p>
                    <RecipeList
                        recipes={favorites}
                        onRemoveFavorite={handleRemoveFavorite}
                        showRemoveButton={true}
                    />
                </div>
            )}
        </div>

    )
}

export default Favorites;