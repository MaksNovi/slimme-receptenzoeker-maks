import { Link } from 'react-router-dom';
import './Login.css';

function Register() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-logo">
                        <h1>Slimme receptenzoeker</h1>
                    </div>
                    <div className="login-image"></div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <h2>Register</h2>
                        <p>Create an account to save your favorite recipes</p>

                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="username">USERNAME</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">PASSWORD</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Create a password"
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">REGISTER</button>
                        </form>
                    </div>

                    <div className="login-footer">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;