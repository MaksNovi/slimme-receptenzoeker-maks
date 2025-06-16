import PropTypes from 'prop-types';
import './FilterStyles.css';

function InputFilter({label, name, value, onChange, placeholder, type = 'text'}) {
    return (
        <div className="filter-item">
            <label htmlFor={`${name}-input`} className="filter-label">
                {label}:
            </label>
            <input
                id={`${name}-input`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="filter-input"
                min="0"
            />
        </div>
    );
}

InputFilter.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

export default InputFilter;