import './Pagination.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 4) {
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  let start = 1;

  if (currentPage > 4) {
    start = currentPage - 3;
  }

  if (start + 3 > totalPages) {
    start = totalPages - 3;
  }

  const pages: number[] = [];

  for (let i = start; i <= start + 3; i++) {
    pages.push(i);
  }

  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage ?
              'pagination__btn pagination__btn--active'
            : 'pagination__btn'
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination__btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}
