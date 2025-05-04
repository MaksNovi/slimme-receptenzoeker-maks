import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

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