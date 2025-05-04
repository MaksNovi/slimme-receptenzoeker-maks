import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({ onSearch, initialValue = '' }) {
    const [ingredients, setIngredients] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredients.trim()) {
            onSearch(ingredients);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar-form">
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Chicken, rice, broccoli"
                className="search-bar-input"
                aria-label="Enter ingredients"
            />
            <button type="submit" className="search-bar-button">Search</button>
        </form>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    initialValue: PropTypes.string
};

export default SearchBar;