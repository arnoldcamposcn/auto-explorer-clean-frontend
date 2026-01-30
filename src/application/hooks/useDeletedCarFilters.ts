// application/hooks/useDeletedCarFilters.ts
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { CarFilters } from "../../shared/constants/queryKeys";

interface UseDeletedCarFiltersProps {
  onFiltersChange?: (filters: CarFilters) => void;
}

export const useDeletedCarFilters = ({
  onFiltersChange,
}: UseDeletedCarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filters: CarFilters = {};

    if (debouncedSearch.trim()) {
      filters.q = debouncedSearch.trim();
    }

    onFiltersChange?.(filters);
  }, [debouncedSearch, onFiltersChange]);

  const clearFilters = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    clearFilters,
  };
};