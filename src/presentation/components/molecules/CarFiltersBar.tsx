
// presentation/components/molecules/CarFiltersBar.tsx
import { FilterSelect } from "./FilterSelect";

interface FilterConfig {
  value: string | null;
  onChange: (value: string | null) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}

interface CarFiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  colorFilter: FilterConfig;
  brandFilter: FilterConfig;
  yearFilter: FilterConfig;
}

export const CarFiltersBar = ({
  searchTerm,
  onSearchChange,
  colorFilter,
  brandFilter,
  yearFilter,
}: CarFiltersBarProps) => {
  return (
    <div className="mb-6 flex items-center gap-2">
      <input
        type="text"
        placeholder="Buscar por marca, modelo o color..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-64">
        <FilterSelect
          options={colorFilter.options}
          value={colorFilter.value}
          onChange={colorFilter.onChange}
          placeholder={colorFilter.placeholder}
        />
      </div>

      <div className="w-64">
        <FilterSelect
          options={brandFilter.options}
          value={brandFilter.value}
          onChange={brandFilter.onChange}
          placeholder={brandFilter.placeholder}
        />
      </div>

      <div className="w-64">
        <FilterSelect
          options={yearFilter.options}
          value={yearFilter.value}
          onChange={yearFilter.onChange}
          placeholder={yearFilter.placeholder}
        />
      </div>
    </div>
  );
};