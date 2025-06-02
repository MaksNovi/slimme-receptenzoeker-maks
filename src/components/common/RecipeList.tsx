import {useState} from 'react';
import {useNavigate} from "react-router-dom";
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
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const handleRecipeClick = (id: number) => {
        navigate(`/recipe/${id}`);
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
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}

export default RecipeList;