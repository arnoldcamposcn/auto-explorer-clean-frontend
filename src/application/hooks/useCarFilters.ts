// application/hooks/useCarFilters.ts
import { useState, useEffect, useMemo, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { CarFilters } from "../../shared/constants/queryKeys";
import { Colors, Brands, Years } from "../../domain/entities/car";
import { createSelectOptions, createNumberSelectOptions } from "../../presentation/components/molecules";

interface UseCarFiltersProps {
  colors: Colors;
  brands: Brands;
  years: Years;
  onFiltersChange?: (filters: CarFilters) => void;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export const useCarFilters = ({
  colors,
  brands,
  years,
  onFiltersChange,
  currentPage = 1,
  onPageChange,
}: UseCarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const debouncedSearch = useDebounce(searchTerm, 500);
  const prevFiltersRef = useRef({ debouncedSearch, selectedColor, selectedBrand, selectedYear });

 
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged = 
      prevFilters.debouncedSearch !== debouncedSearch ||
      prevFilters.selectedColor !== selectedColor ||
      prevFilters.selectedBrand !== selectedBrand ||
      prevFilters.selectedYear !== selectedYear;
    
    if (filtersChanged && currentPage !== 1) {
      onPageChange?.(1);
    }

    prevFiltersRef.current = { debouncedSearch, selectedColor, selectedBrand, selectedYear };
  }, [debouncedSearch, selectedColor, selectedBrand, selectedYear, currentPage, onPageChange]);


  const colorOptions = useMemo(
    () => createSelectOptions(colors, "Todos los colores"),
    [colors]
  );

  const brandOptions = useMemo(
    () => createSelectOptions(brands, "Todas las marcas"),
    [brands]
  );

  const yearOptions = useMemo(
    () => createNumberSelectOptions(years, "Todos los años"),
    [years]
  );


  useEffect(() => {
    const filters: CarFilters = {};

    if (debouncedSearch.trim()) {
      filters.q = debouncedSearch.trim();
    }

    if (selectedColor && selectedColor.trim()) {
      filters.color = selectedColor.trim();
    }

    if (selectedBrand && selectedBrand.trim()) {
      filters.brand = selectedBrand.trim();
    }

    if (selectedYear && selectedYear !== null) {
      filters.year = selectedYear;
    }

    filters.page = currentPage;
    filters.limit = 10;

    onFiltersChange?.(filters);
  }, [debouncedSearch, selectedColor, selectedBrand, selectedYear, currentPage, onFiltersChange]); // ✅ Agregar currentPage

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedColor(null);
    setSelectedBrand(null);
    setSelectedYear(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    selectedBrand,
    setSelectedBrand,
    selectedYear,
    setSelectedYear,
    colorOptions,
    brandOptions,
    yearOptions,
    clearFilters,
    colorFilter: {
      value: selectedColor,
      onChange: setSelectedColor,
      options: colorOptions,
      placeholder: "Filtrar por color...",
    },
    brandFilter: {
      value: selectedBrand,
      onChange: setSelectedBrand,
      options: brandOptions,
      placeholder: "Filtrar por marca...",
    },
    yearFilter: {
      value: selectedYear ? selectedYear.toString() : null,
      onChange: (value: string | null) => setSelectedYear(value ? Number(value) : null),
      options: yearOptions,
      placeholder: "Filtrar por año...",
    },
  };
};