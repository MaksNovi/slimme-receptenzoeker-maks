import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useFormValidation from "../hooks/useFormValidation.jsx";
import './Login.css';
import FormInput from "../components/common/FormInput.jsx";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationRules = {
        username: {
            required: true,
            minLength: 5,
            messages: {
                required: 'Username is required',
                minLength: 'Username must be at least 5 characters long'
            }
        },
        email: {
            required: true,
            email: true,
            messages: {
                required: 'Email is required',
                email: 'Email is not valid'
            }
        },
        password: {
            required: true,
            minLength: 8,
            uppercase: true,
            messages: {
                required: 'Password is required',
                minLength: 'Password must be at least 8 characters long',
                uppercase: 'Password must contain at least one uppercase letter'
            }
        },
        confirmPassword: {
            required: true,
            match: 'Passwords do not match',
            messages: {
                required: 'Confirm password is required',
                match: 'Passwords do not match'
            }
        }
    };

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateForm,
        setErrors
    } = useFormValidation(initialValues, validationRules);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        // Validation for passwords matching confirmation
        if(values.password !== values.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validationRules.confirmPassword.messages.match
            }));
            return;
        }

        if(validateForm()) {
            setIsLoading(true);

            try {
                const response = await fetch('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        role: ["user"]
                    })
                });

                if(!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Registration failed');
                }

                navigate('/login', {
                    state: { message: 'Registration successful, you can now log in.' }
                });
            } catch (error) {
                setApiError(error.message);
            } finally {
                setIsLoading(false);
            }
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

                        {apiError && <div className="api-error-message">{apiError}</div>}

                        <form onSubmit={handleSubmit} className="login-form">
                            <FormInput
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.username}
                                touched={touched.username}
                                placeholder="Choose a username"
                                required
                            />

                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                touched={touched.email}
                                placeholder="Enter your email address"
                                required
                            />

                            <FormInput
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password}
                                touched={touched.password}
                                placeholder="Create a password"
                                required
                            />

                            <FormInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm your password"
                                required
                            />

                            <button type="submit" className="login-button" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
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