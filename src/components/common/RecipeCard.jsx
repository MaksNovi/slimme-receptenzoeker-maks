import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ recipe, onClick }) {
    return (
        <div className="recipe-card">
            <div className="recipe-image-container">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                />
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