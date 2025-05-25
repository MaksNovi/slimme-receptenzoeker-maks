import {useEffect, useState} from "react"

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = localStorage.getItem("favorites");

        if(favs) {
            setFavorites(JSON.parse(favs));
        }
    }, []);

    return (
        <div className="favorites-page">
            <h1>My favorites recipes</h1>
            {favorites.length === 0 ? (
                <p>You have no favorite recipes yet. Start adding some!</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map(recipe => (
                        <div key={recipe.id} className="favorite-card">
                            <img src={recipe.image} alt={recipe.title} className="favorite-image"/>

                            <div className="favorite-card-content">
                                <h2 className="favorite-title">{recipe.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites;