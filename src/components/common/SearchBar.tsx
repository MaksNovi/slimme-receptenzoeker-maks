import {useEffect, useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch, placeholder = "Enter ingredients..."}) {
    const [searchIngredients, setSearchIngredients] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const savedSearches = localStorage.getItem('recent-searches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

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

    const saveSearch = (search: string) => {
        if (!search.trim()) return;

        const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchIngredients.trim()) {
            saveSearch(searchIngredients);
            onSearch(searchIngredients);
            setShowSuggestions(false);
        }
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
                        <div key={index} onClick={() => setSearchIngredients(search)}>
                            {search}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;