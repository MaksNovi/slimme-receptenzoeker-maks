import {useNavigate} from "react-router-dom";
import {useSearch} from "../../contexts/SearchContext";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";

const recipesPerPage = 12;

interface RecipeListProps {
    recipes: Array<{
        id: number;
        image: string;
        title: string;
        usedIngredientCount: number;
        missedIngredientCount: number;
        readyInMinutes?: number;
        servings?: number;
    }>;
    onRemoveFavorite?: (id: number) => void;
    showRemoveButton?: boolean;
}

function RecipeList({recipes, onRemoveFavorite, showRemoveButton = false}: RecipeListProps) {
    const {currentPage, setCurrentPage} = useSearch();
    const navigate = useNavigate();

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const handleRecipeClick = (id: number) => {
        navigate(`/recipe/${id}`);
    };

    //Update context instead of using the local state
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const renderRecipeCard = (recipe: RecipeListProps['recipes'][0]) => (
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
    )
}

export default RecipeList;