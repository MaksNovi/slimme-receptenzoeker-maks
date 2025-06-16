import {useEffect, useState} from 'react';
import {useSearch} from "../../contexts/SearchContext";
import './SearchBar.css';
import PropTypes from "prop-types";

function SearchBar({onSearch, placeholder = "Enter ingredients..."}) {
    const {searchTerm: contextSearchTerm} = useSearch();
    const [searchIngredients, setSearchIngredients] = useState(contextSearchTerm || '');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const savedSearches = localStorage.getItem('recent-searches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    useEffect(() => {
        if (contextSearchTerm && contextSearchTerm !== searchIngredients) {
            setSearchIngredients(contextSearchTerm);
        }
    }, [contextSearchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-bar-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const saveSearch = (search) => {
        if (!search.trim()) return;

        const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchIngredients.trim()) {
            saveSearch(searchIngredients);
            onSearch(searchIngredients).catch(err => console.error('Error searching for recipes:', err));
            setShowSuggestions(false);
        }
    };

    const handleRecentSearchClick = (search) => {
        setSearchIngredients(search);
        onSearch(search).catch(error => {
            console.error('Search failed:', error);
        });
        setShowSuggestions(false);
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchIngredients}
                    onChange={(e) => setSearchIngredients(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={placeholder}
                />

                <button type="submit" className="search-bar-button">Search</button>
            </form>

            {showSuggestions && recentSearches.length > 0 && (
                <div className="recent-searches">
                    <h4>Recent Searches:</h4>

                    {recentSearches.map((search, index) => (
                        <div key={index} onClick={() => handleRecentSearchClick(search)} className="recent-search-item">
                            {search}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default SearchBar;