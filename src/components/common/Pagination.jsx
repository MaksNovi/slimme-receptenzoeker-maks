import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({totalPages, currentPage, setCurrentPage}) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Generate array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-container" aria-label="Recipe pagination">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="page-item"
                type="button"
            >
                Previous
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`page-item ${currentPage === number ? 'active' : ''}`}
                    type="button"
                >
                    {number}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="page-item"
                type="button"
            >
                Next
            </button>
        </nav>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired
};

export default Pagination;
