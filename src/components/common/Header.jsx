import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import './Header.css';
import logo from '../../assets/food-researcher-logo.svg'

function Header() {
    const { currentUser, isAuthenticated, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="Slimme receptenzoeker Logo" className="logo" />
                    <h1>Slimme receptenzoeker</h1>
                </Link>

                <nav className="main-nav">
                    <ul>
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/search-results" className={location.pathname === '/search-results' ? 'active' : ''}>Search Results</Link></li>
                        <li><Link to="/popular-recipes" className={location.pathname === '/popular-recipes' ? 'active' : ''}>Popular Recipes</Link></li>
                        {isAuthenticated && (
                            <li><Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>Favorites</Link></li>
                        )}
                    </ul>
                </nav>

                <div className="auth-section" aria-live="polite">
                    {isAuthenticated ? (
                        <>
              <span className="username" aria-label={`Logged in as ${currentUser?.username}`}>
                Welcome, {currentUser?.username}
              </span>
                            <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="login-btn" aria-current={location.pathname === '/login' ? 'page' : undefined}>
                                Login
                            </Link>
                            <Link to="/register" className="register-btn" aria-current={location.pathname === '/register' ? 'page' : undefined}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;