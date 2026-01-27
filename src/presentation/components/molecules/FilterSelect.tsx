// presentation/components/molecules/FilterSelect.tsx
import Select from "react-select";

interface FilterSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
  width?: string; // Opcional para flexibilidad
}

export const FilterSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder,
  width = "w-64" 
}: FilterSelectProps) => {
  return (
    <div className={width}>
      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || options[0]}
        onChange={(option) => {
          const newValue = option?.value || null;
          onChange(newValue === "" ? null : newValue);
        }}
        placeholder={placeholder}
        isClearable={false}
        className="text-sm"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "42px",
          }),
        }}
      />
    </div>
  );
};