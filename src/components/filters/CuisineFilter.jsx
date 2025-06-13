import {useSearch} from '../../contexts/SearchContext';
import './CuisineFilter.css';

// Cuisine options
const cuisineOptions = [
    {value: '', label: 'All cuisines'},
    {value: 'italian', label: 'Italian'},
    {value: 'mexican', label: 'Mexican'},
    {value: 'asian', label: 'Asian'},
    {value: 'american', label: 'American'},
    {value: 'mediterranean', label: 'Mediterranean'},
    {value: 'indian', label: 'Indian'},
    {value: 'chinese', label: 'Chinese'},
    {value: 'french', label: 'French'},
    {value: 'thai', label: 'Thai'}
];

function CuisineFilter() {
    const {filters, updateFilters} = useSearch();

    const handleCuisineChange = (e) => {
        const cuisine = e.target.value;
        updateFilters({cuisine});
    };

    return (
        <div className="cuisine-filter">
            <label htmlFor="cuisine-select" className="filter-label">
                Kitchen type:
            </label>
            <select
                id="cuisine-select"
                value={filters.cuisine}
                onChange={handleCuisineChange}
                className="cuisine-select"
            >
                {cuisineOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CuisineFilter;