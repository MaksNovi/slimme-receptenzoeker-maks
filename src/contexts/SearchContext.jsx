import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

const context = createContext(undefined);
export const useSearch = () => {
    const value = useContext(context);
    if (value === undefined) {
        throw new Error('useSearch must be used within a SearchContextProvider');
    }
    return value;
};

// Define default filters
const defaultFilters = {
    cuisine: '',
    diet: '',
    maxReadyTime: '',
    type: ''
};

// Export the provider component
export const SearchContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [previousRoute, setPreviousRoute] = useState(''); // Renamed for clarity
    const [filters, setFilters] = useState(defaultFilters);

    const updateFilters = useCallback((newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
        setCurrentPage(1); // Reset to the first page when filters are updated
    }, []);

    const updateSearch = useCallback((term, results) => {
        setSearchTerm(term);
        setSearchResults(results);
        setHasSearched(true);
        setCurrentPage(1); // Reset to the first page on the new search
    }, []); // Empty dependency array for stability.

    const clearSearch = useCallback(() => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
        setCurrentPage(1);
        setFilters(defaultFilters); // Reset filters when clearing search
    }, []);

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

    // useMemo will only re-create the context value object when one of its dependencies changes.
    const value = useMemo(() => ({
        searchTerm,
        searchResults,
        hasSearched,
        currentPage,
        filters,
        updateSearch,
        clearSearch,
        setCurrentPage,
        previousRoute,
        setPreviousRoute,
        updateFilters
    }), [
        searchTerm,
        searchResults,
        hasSearched,
        currentPage,
        setCurrentPage,
        filters,
        updateSearch,
        clearSearch,
        previousRoute,
        setPreviousRoute,
        updateFilters
    ]);

    return <context.Provider value={value}>{children}</context.Provider>;
};

// PropTypes for validation
SearchContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};