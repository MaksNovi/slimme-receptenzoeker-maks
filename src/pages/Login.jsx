import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from '../contexts/AuthContext.jsx';
import useFormValidation from "../hooks/useFormValidation.jsx";
import FormInput from "../components/common/FormInput.jsx";
import './Login.css';

function Login() {
   const [isLoading, setIsLoading] = useState(false);
   const [apiError, setApiError] = useState('');
   const { login } = useAuthContext();
   const navigate = useNavigate();

   const initialValue = {
       username: '',
       password: ''
   };

   const validationRules = {
       username: {
           required: true,
           messages: {
               required: 'Username is required',
           }
       },
       password: {
           required: true,
           minLength: 6,
           requireUppercase: true,
           messages: {
               required: 'Password is required',
           }
       }
   };

   const {
       values,
       errors,
       touched,
       handleChange,
       handleBlur,
       validateForm
   } = useFormValidation(initialValue, validationRules);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if(validateForm()) {
            setIsLoading(true);

            try {
                const response = await fetch('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }

                const userData = await response.json();
                login(userData);
                navigate('/');
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
                        <h2>Log In</h2>
                        <p>Join us to explore recipes</p>

                        {apiError && (
                            <div className="api-error-message">
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <FormInput
                                label="Username"
                                name="username"
                                type="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.username}
                                touched={touched.username}
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                required
                            />

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                    </div>

                    <div className="login-footer">
                        <p>Dont have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
