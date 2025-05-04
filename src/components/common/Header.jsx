import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/food-researcher-logo.svg'

function Header() {

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="Slimme receptenzoeker Logo" className="logo" />
                    <h1>Slimme receptenzoeker</h1>
                </Link>

                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search-results">Search Results</Link></li>
                        <li><Link to="/recipe/details">Recipe Details</Link></li>
                        <li><Link to="/recipe/details">Favourite Recipes</Link></li>
                    </ul>
                </nav>

                <div className="auth-buttons">
                    <Link to="/login" className="login-button">Login</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;