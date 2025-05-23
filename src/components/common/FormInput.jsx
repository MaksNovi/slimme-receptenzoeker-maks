import PropTypes from 'prop-types';
import './FormInput.css'

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    required = false,
    className = '',
}) => {
    return (
        <div className={`form-input-group ${className}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label.toUpperCase()}
                    {required && <span className="required-asterisk">*</span>}
                </label>
            )}

            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`form-input ${error && touched ? 'input-error' : ''}`}
                required={required}
            />

            {error && touched && <span className="form-error-message">{error}</span>}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string,
    touched: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string
};

export default FormInput;