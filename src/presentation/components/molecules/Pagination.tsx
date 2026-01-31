// presentation/components/molecules/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  }
  
  export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    hasNextPage = false,
    hasPreviousPage = false,
  }: PaginationProps) => {
    const handlePrevious = () => {
      if (hasPreviousPage && currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (hasNextPage && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    if (totalPages <= 1) {
      return null; // No mostrar si hay una página o menos
    }
  
    return (
      <div className="flex justify-center items-center gap-2">
        {/* Botón Anterior */}
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            hasPreviousPage
              ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Anterior
        </button>
  
        {/* Info de página */}
        <span className="px-4 py-2 text-gray-700 font-medium">
          Página {currentPage} de {totalPages}
        </span>
  
        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            hasNextPage
              ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Siguiente
        </button>
      </div>
    );
  };