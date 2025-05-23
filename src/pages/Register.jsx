import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {}

        // Validate username
        if (username.length < 5) {
            newErrors.username = 'Username must be at least 5 characters long';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            newErrors.email = 'Please enter valid email address';
        }

        // Validate password
        if(password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if(!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        }

        if(password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateForm()) {
            console.log('Register attempt with:', { username, email, password });
        }
    };
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

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="username">USERNAME</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Choose a username"
                                    className={errors.username ? 'input-error' : ''}
                                    required
                                />
                                {errors.username && <span className="error-message">{errors.username}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className={errors.email ? 'input-error' : ''}
                                    required
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">PASSWORD</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className={errors.password ? 'input-error' : ''}
                                    required
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}

                                <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    className={errors.confirmPassword ? 'input-error' : ''}
                                    required
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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