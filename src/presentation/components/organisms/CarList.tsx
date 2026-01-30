// presentation/components/organisms/CarList.tsx
import { ReactNode, useState } from "react";
import { Brands, Car, Colors, Years } from "../../../domain/entities/car";
import { CarFilters } from "../../../shared/constants/queryKeys";
import { useCarFilters } from "../../../application/hooks/useCarFilters";
import { useDeletedCarFilters } from "../../../application/hooks/useDeletedCarFilters";
import { useCarModal } from "../../../application/hooks/useCarModal";
import { CarFiltersBar } from "../molecules/CarFiltersBar";
import { CarsTable } from "../molecules/CarsTable";
import { CarModal } from "../molecules/CarModal";
import { Button } from "../atoms/Button";

interface Props {
  cars: Car[];
  carsDeleted: Car[];
  colors: Colors;
  brands: Brands;
  years: Years;
  onDelete: (id: number) => void;
  onDeletePermanently: (id: number) => void;
  restoreCar: (id: number) => void;
  onFiltersChange?: (filters: CarFilters) => void;
  onFiltersChangeDeleted?: (filters: CarFilters) => void;
  onUpdateCar: (id: number, payload: Partial<Car>) => Promise<void>;
  children?: ReactNode;
}

export const CarList = ({
  cars,
  carsDeleted,
  colors,
  brands,
  years,
  onDelete,
  onDeletePermanently,
  restoreCar,
  onFiltersChange,
  onFiltersChangeDeleted,
  onUpdateCar,
  children,
}: Props) => {
  const [showCarsDeleted, setShowCarsDeleted] = useState(false);
  
  // ✅ Hooks extraídos
  const filters = useCarFilters({
    colors,
    brands,
    years,
    onFiltersChange: showCarsDeleted ? undefined : onFiltersChange,
  });

  const deletedFilters = useDeletedCarFilters({
    onFiltersChange: showCarsDeleted ? onFiltersChangeDeleted : undefined,
  });

  const modal = useCarModal();

  // Lógica de toggle
  const handleToggleCarsDeleted = () => {
    const newValue = !showCarsDeleted;
    setShowCarsDeleted(newValue);

    if (newValue) {
      filters.clearFilters();
      onFiltersChange?.({});
    } else {
      deletedFilters.clearFilters();
      onFiltersChangeDeleted?.({});
    }
  };

  const carsToShow = showCarsDeleted ? carsDeleted : cars;
  const hasActiveFilters = Boolean(
    filters.searchTerm || filters.selectedColor || filters.selectedBrand || filters.selectedYear
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
          Panel Administrativo de Autos
        </h1>
        <p className="text-gray-500 text-sm">Control de inventario de flota</p>
      </div>

      {/* Botón crear */}
      {!showCarsDeleted && (
        <div className="mb-4 flex justify-end">
          <Button onClick={modal.openCreateModal}>
            Nuevo Auto
          </Button>
        </div>
      )}

      <div className="bg-white">
        {/* Modal */}
        <CarModal
          isOpen={modal.isOpen}
          onClose={modal.closeModal}
          selectedCar={modal.selectedCar}
          onUpdate={onUpdateCar}
        >
          {children}
        </CarModal>

        {/* Barra de filtros */}
        {!showCarsDeleted ? (
           <CarFiltersBar
           searchTerm={filters.searchTerm}
           onSearchChange={filters.setSearchTerm}
           colorFilter={filters.colorFilter}
           brandFilter={filters.brandFilter}
           yearFilter={filters.yearFilter}
         />
        ) : (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar autos eliminados por marca, modelo o color..."
              value={deletedFilters.searchTerm}
              onChange={(e) => deletedFilters.setSearchTerm(e.target.value)}
              className="flex-1 max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Toggle button */}
        <div className="mb-6">
          <button
            type="button"
            className="flex gap-4 p-4 bg-amber-400 cursor-pointer hover:bg-amber-500 transition-colors rounded"
            onClick={handleToggleCarsDeleted}
          >
            {showCarsDeleted ? "Autos Disponibles" : "Autos Eliminados"}
            <span className="text-white font-bold">
              {showCarsDeleted ? "🟢" : "🔴"}
            </span>
          </button>
        </div>

        {/* Tabla */}
        <CarsTable
          cars={carsToShow}
          showCarsDeleted={showCarsDeleted}
          onEdit={modal.openEditModal}
          onDelete={onDelete}
          onRestore={restoreCar}
          onDeletePermanently={onDeletePermanently}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </div>
  );
};