// application/hooks/useDeletedCarFilters.ts
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { CarFilters } from "../../shared/constants/queryKeys";

interface UseDeletedCarFiltersProps {
  onFiltersChange?: (filters: CarFilters) => void;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export const useDeletedCarFilters = ({
  onFiltersChange,
  currentPage = 1,
  onPageChange,
}: UseDeletedCarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filters: CarFilters = {};

    if (debouncedSearch.trim()) {
      filters.q = debouncedSearch.trim();
    }

    filters.page = currentPage;
    filters.limit = 10;

    onFiltersChange?.(filters);
  }, [debouncedSearch, currentPage, onFiltersChange]);


  useEffect(() => {
    if (debouncedSearch && currentPage !== 1) {
      onPageChange?.(1);
    }
  }, [debouncedSearch, currentPage, onPageChange]);


  const clearFilters = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    clearFilters,
  };
};