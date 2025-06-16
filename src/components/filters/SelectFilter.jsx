import PropTypes from 'prop-types';

function SelectFilter({label, name, value, onChange, options, placeholder}) {
    return (
        <div className="filter-item">
            <label htmlFor={`${name}-select`} className="filter-label">{label}:</label>
            <select
                id={`${name}-select`}
                name={name}
                value={value}
                onChange={onChange}
                className="filter-select"
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

SelectFilter.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    placeholder: PropTypes.string,
};

export default SelectFilter;
