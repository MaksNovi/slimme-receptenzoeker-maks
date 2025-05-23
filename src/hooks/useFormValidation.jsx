import {useState} from 'react';

const useFormValidation = (initialValue, validationRules) => {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        const rules = validationRules[name];
        if(!rules) return '';

        // Required field validation
        if (rules.required &&  (!value || value.trim() === '')) {
            return rules.messages?.required || `${name} is required`;
        }

        // Email format validation
        if(rules.email && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value)) {
                return rules.messages?.email || 'Invalid email format';
            }
        }

        // Min length validation
        if(rules.minLength && value && value.length < rules.minLength) {
            return rules.messages?.minLength || `${name} must be at least ${rules.minLength} characters long`;
        }

        // Require uppercase validation
        if(rules.uppercase && value && !/[A-Z]/.test(value)) {
            return rules.messages?.uppercase || `${name} must contain at least one uppercase letter`;
        }

        return '';
    };

    const handleChange = (e) => {
        const {name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if(touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }

    const handleBlur = (e) => {
        const {name, value} = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const error = validateField(fieldName, values[fieldName]);

            if(error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(Object.keys(validationRules).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {}));

        return isValid;
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateForm,
        setValues,
        setErrors
    };
};

export default useFormValidation;