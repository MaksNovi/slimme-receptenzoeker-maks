import {useNavigate} from "react-router-dom";
import {useSearch} from "../../contexts/SearchContext";
import RecipeCard from "./RecipeCard.jsx";
import Pagination from "./Pagination.jsx";
import PropTypes from 'prop-types';

const recipesPerPage = 12;

function RecipeList({recipes, onRemoveFavorite, showRemoveButton = false}) {
    const {currentPage, setCurrentPage} = useSearch();
    const navigate = useNavigate();

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    // Update context instead of using the local state
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const renderRecipeCard = (recipe) => (
        <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={handleRecipeClick}
            onRemoveFavorite={onRemoveFavorite}
            showRemoveButton={showRemoveButton}
        />
    );

    return (
        <div>
            <div className="recipe-list">
                {currentRecipes.map(renderRecipeCard)}
            </div>

            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                />
            )}
        </div>
    );
}

// PropTypes for RecipeList component
RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        usedIngredientCount: PropTypes.number.isRequired,
        missedIngredientCount: PropTypes.number.isRequired,
        readyInMinutes: PropTypes.number,
        servings: PropTypes.number
    })).isRequired,
    onRemoveFavorite: PropTypes.func,
    showRemoveButton: PropTypes.bool
};

export default RecipeList;