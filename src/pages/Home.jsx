import {Link} from 'react-router-dom';
import './Home.css';
import {useAuthContext} from "../contexts/AuthContext.jsx";
import mealImage1 from '../assets/mealImage1.jpg';
import mealImage2 from '../assets/mealImage2.jpg';
import mealImage3 from '../assets/mealImage3.jpg';

function Home() {
    const { isAuthenticated } = useAuthContext();

    return (
        <div className="home-page">
            <div className="hero-section">
                <h2 className="welcome-title">Welcome to Slimme receptenzoeker</h2>
                <p className="welcome-text">
                    Discover new recipes and make the most of your pantry ingredients with Slimme receptenzoeker.
                    Our service helps you find delicious recipes based on the ingredients you have at home,
                    reducing food waste and enhancing your culinary adventures.
                </p>

                <div className="features-section">
                    <Link to="/search-results" className="feature-card">
                        <div className="feature-image-container">
                            <img src={mealImage1} alt="Search by ingredients" className="feature-image" />
                        </div>
                        <h3>Search by Ingredients</h3>
                        <p>Find recipes using what you already have in your pantry</p>
                    </Link>

                    <Link to="/popular-recipes" className="feature-card">
                        <div className="feature-image-container">
                            <img src={mealImage2} alt="Popular recipes" className="feature-image" />
                        </div>
                        <h3>Popular Recipes</h3>
                        <p>Explore our most loved recipes by other users</p>
                    </Link>

                    <Link to="/nutrition" className="feature-card">
                        <div className="feature-image-container">
                            <img src={mealImage3} alt="Nutrition advice" className="feature-image" />
                        </div>
                        <h3>Nutrition Advice</h3>
                        <p>Get personalized nutrition information for each recipe</p>
                    </Link>
                </div>

                <div className="cta-section">
                    <Link to="/search-results" className="cta-button">Start Searching Recipes</Link>
                    {!isAuthenticated && (
                        <Link to="/register" className="cta-button secondary">Create an Account</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
