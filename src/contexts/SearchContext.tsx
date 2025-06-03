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

// Define the context type
interface SearchContextType {
    searchTerm: string;
    searchResults: any[];
    hasSearched: boolean;
    updateSearch: (term: string, results: any[]) => void;
    clearSearch: () => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

// Create the context
const [SearchProvider, useSearch] = createRequiredContext<SearchContextType>();

// Export the provider component
export const SearchContextProvider = ({children}: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const updateSearch = (term: string, results: any[]) => {
        setSearchTerm(term);
        setSearchResults(results);
        setHasSearched(true);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
        setCurrentPage(1); // Reset to the first page when clearing search
    };

    return (
        <SearchProvider value={{
            searchTerm,
            searchResults,
            hasSearched,
            updateSearch,
            clearSearch,
            currentPage,
            setCurrentPage
        }}>
            {children}
        </SearchProvider>
    );
};

export {useSearch};