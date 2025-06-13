import {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

// Utility function for the required context
function createRequiredContext() {
    const context = createContext(undefined);

    const useRequiredContext = () => {
        const value = useContext(context);
        if (value === undefined) {
            throw new Error('Context must be used within its Provider');
        }
        return value;
    };

    return [context.Provider, useRequiredContext];
}

// Define default filters
const defaultFilters = {
    cuisine: '',
};

// Create the context
const [SearchProvider, useSearch] = createRequiredContext();

// Export the provider component
export const SearchContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [previousRoute, setPreviousRoute] = useState(''); // Renamed for clarity
    const [filters, setFilters] = useState(defaultFilters);

    const updateFilters = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
        setCurrentPage(1); // Reset to the first page when filters are updated
    };

    const updateSearch = (term, results) => {
        setSearchTerm(term);
        setSearchResults(results);
        setHasSearched(true);
        setCurrentPage(1); // Reset to the first page on the new search
        // Don't reset filters on new search - keep user's filter preferences
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
        setCurrentPage(1);
        setPreviousRoute('');
        setFilters(defaultFilters); // Reset filters when clearing search
    };

    useEffect(() => {
        const handleLogout = () => {
            setSearchTerm('');
            setSearchResults([]);
            setHasSearched(false);
            setCurrentPage(1);
            setPreviousRoute('');
            setFilters(defaultFilters);
        };

        window.addEventListener('userLogout', handleLogout);

        return () => {
            window.removeEventListener('userLogout', handleLogout);
        };
    }, []);

    return (
        <SearchProvider value={{
            searchTerm,
            searchResults,
            hasSearched,
            currentPage,
            previousRoute,
            filters,
            updateSearch,
            clearSearch,
            setCurrentPage,
            setPreviousRoute,
            updateFilters
        }}>
            {children}
        </SearchProvider>
    );
};

// PropTypes for validation
SearchContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export {useSearch};