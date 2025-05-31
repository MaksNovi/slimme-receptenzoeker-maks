import {useState} from 'react';
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
}

function RecipeList({recipes}: RecipeListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const renderRecipeCard = (recipe: RecipeListProps['recipes'][0]) => (
        <RecipeCard
            key={recipe.id}
            recipe={recipe}
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