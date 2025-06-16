import {useSearch} from '../../contexts/SearchContext';
import SelectFilter from './SelectFilter';
import InputFilter from "./InputFilter.jsx";
import './FilterStyles.css'

// Define options for the filters
const cuisineOptions = [
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
const dietOptions = [
    {value: 'vegetarian', label: 'Vegetarian'},
    {value: 'vegan', label: 'Vegan'},
    {value: 'glutenfree', label: 'Gluten-Free'}
];
const mealTypeOptions = [
    {value: 'main course', label: 'Main Course'},
    {value: 'dessert', label: 'Dessert'},
    {value: 'snack', label: 'Snack'}
];

function FilterPanel() {
    const {filters, updateFilters} = useSearch();

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        updateFilters({[name]: value});
    };

    return (
        <div className="filter-panel">
            <SelectFilter
                label="Cuisine"
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                options={cuisineOptions}
                placeholder="All Cuisines"
            />

            <SelectFilter
                label="Diet"
                name="diet"
                value={filters.diet}
                onChange={handleFilterChange}
                options={dietOptions}
                placeholder="All Diets"
            />

            <SelectFilter
                label="Meal Type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                options={mealTypeOptions}
                placeholder="All Types"
            />

            <InputFilter
                label="Max. Prep Time (min)"
                name="maxReadyTime"
                type="number"
                value={filters.maxReadyTime}
                onChange={handleFilterChange}
                placeholder="e.g., 30"
            />
        </div>
    );
}

export default FilterPanel;
