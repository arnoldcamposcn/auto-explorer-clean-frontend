// application/hooks/useCarFilters.ts
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { CarFilters } from "../../shared/constants/queryKeys";
import { Colors, Brands, Years } from "../../domain/entities/car";
import { createSelectOptions, createNumberSelectOptions } from "../../presentation/components/molecules";

interface UseCarFiltersProps {
  colors: Colors;
  brands: Brands;
  years: Years;
  onFiltersChange?: (filters: CarFilters) => void;
}

export const useCarFilters = ({
  colors,
  brands,
  years,
  onFiltersChange,
}: UseCarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const debouncedSearch = useDebounce(searchTerm, 500);

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

    onFiltersChange?.(filters);
  }, [debouncedSearch, selectedColor, selectedBrand, selectedYear, onFiltersChange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedColor(null);
    setSelectedBrand(null);
    setSelectedYear(null);
  };

  return {
    // Estados individuales (para uso directo si es necesario)
    searchTerm,
    setSearchTerm,
    selectedColor,
    setSelectedColor,
    selectedBrand,
    setSelectedBrand,
    selectedYear,
    setSelectedYear,
    // Opciones
    colorOptions,
    brandOptions,
    yearOptions,
    // Utilidades
    clearFilters,
    // ✅ Objetos agrupados para CarFiltersBar
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