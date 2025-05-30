import './Pagination.css';

const Pagination = ({currentPage, totalPages, onPageChange, hasMore}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasMore) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages || currentPage + 2, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`page-number ${currentPage === i ? 'active' : ''}`}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="pagination-btn"
            >
                Previous
            </button>

            <div className="page-numbers">
                {renderPageNumbers()}
            </div>

            <button
                onClick={handleNext}
                disabled={!hasMore}
                className="pagination-btn"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;