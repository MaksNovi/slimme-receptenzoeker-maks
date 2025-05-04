import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';
import {useEffect, useState} from "react";
import {getRecipeDetails} from "../services/SpoonacularService.js";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [setRecipe] = useState(null);
    const [setIsLoading] = useState(true);
    const [setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getRecipeDetails(id);
                setRecipe(data);
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    return(
        <div className="recipe-details-page">
            <div className="recipe-details-header">
                <button onClick={() => navigate(-1)} className="back-button">Back</button>
            </div>

            <div className="recipe-details-content">
                <p>Details for recipe ID: {id}</p>
            </div>
        </div>
    );
}

export default RecipeDetails;