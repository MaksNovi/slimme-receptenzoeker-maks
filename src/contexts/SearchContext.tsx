import {createContext, ReactNode, useContext, useState} from 'react';

// Utility function for the required context
function createRequiredContext<T>() {
    const context = createContext<T | undefined>(undefined);

    const useRequiredContext = () => {
        const value = useContext(context);
        if (value === undefined) {
            throw new Error('Context must be used within its Provider');
        }
        return value;
    };

    return [context.Provider, useRequiredContext] as const;
}

// Define search filters
interface SearchFilters {
    cuisine: string;
    diet: string[];
    maxReadyTime: number;
    type: string;
}

// Define the context type
interface SearchContextType {
    searchTerm: string;
    searchResults: any[];
    hasSearched: boolean;
    updateSearch: (term: string, results: any[]) => void;
    clearSearch: () => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    previousPage: string;
    setPreviousPage: (page: string) => void;
    filters?: SearchFilters; // Optional filters for search
    updateFilters?: (newFilters: Partial<SearchFilters>) => void;
}

const defaultFilters: SearchFilters = {
    cuisine: '',
    diet: [],
    maxReadyTime: 120,
    type: ''
};

// Create the context
const [SearchProvider, useSearch] = createRequiredContext<SearchContextType>();

// Export the provider component
export const SearchContextProvider = ({children}: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [previousPage, setPreviousPage] = useState(''); // Track the previous page for navigation
    const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

    const updateFilters = (newFilters: Partial<SearchFilters>) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
        setCurrentPage(1); // Reset to the first page when filters are updated
    }

    const updateSearch = (term: string, results: any[]) => {
        setSearchTerm(term);
        setSearchResults(results);
        setHasSearched(true);
        setCurrentPage(1); // Reset to the first page on the new search
        setFilters(defaultFilters);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
        setCurrentPage(1); // Reset to the first page when clearing search
        setPreviousPage(''); // Clear previous page when search is cleared
    };

    return (
        <SearchProvider value={{
            searchTerm,
            searchResults,
            hasSearched,
            currentPage,
            previousPage,
            filters,
            updateSearch,
            clearSearch,
            setCurrentPage,
            setPreviousPage,
            updateFilters
        }}>
            {children}
        </SearchProvider>
    );
};

export {useSearch};