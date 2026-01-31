// presentation/pages/CarsPage.tsx
import { CarForm } from "../components/organisms/CarForm";
import { CarList } from "../components/organisms/CarList";
import { useCars } from "../../application/hooks/useCars";
import { toast } from "react-toastify";
import { Car } from "../../domain/entities/car";
import { useState, useCallback } from "react";
import { CarFilters } from "../../shared/constants/queryKeys";

export const CarsPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageDeleted, setCurrentPageDeleted] = useState(1);
  const [filters, setFilters] = useState<CarFilters>({
    page: 1,
    limit: 10,
  });
  const [deletedFilters, setDeletedFilters] = useState<CarFilters>({
    page: 1,
    limit: 10,
  });

  const { 
    cars, 
    carsMeta, 
    carsDeleted,
    carsDeletedMeta,
    colors,
    brands,
    years,
    error, 
    createCar, 
    deleteCar, 
    restoreCar,
    deletePermanently,
    updateCar
  } = useCars(filters, deletedFilters);

  const handleCreate = async (carData: Omit<Car, "id">) => {
    try {
      await createCar(carData);
      toast.success("Auto creado correctamente");
    } catch {
      toast.error("Error al crear el auto");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      toast.success("Auto eliminado correctamente");
    } catch {
      toast.error("Error al eliminar el auto");
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await restoreCar(id);
      toast.success("Auto restaurado correctamente");
    } catch {
      toast.error("Error al restaurar el auto");
    }
  };

  const handleDeletePermanently = async (id: number) => {
    try {
      await deletePermanently(id);
      toast.success("Auto eliminado permanentemente correctamente");
    } catch {
      toast.error("Error al eliminar el auto permanentemente");
    }
  };

  const handleUpdate = async (id: number, payload: Partial<Car>): Promise<void> => {
    try {
      await updateCar(id, payload);
      toast.success("Auto actualizado correctamente");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Error al actualizar el auto";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleFiltersChange = useCallback((newFilters: CarFilters) => {
    setFilters(prev => ({
      ...newFilters,
      page: prev.page || 1,
      limit: prev.limit || 10,
    }));
  }, []);

  const handleFiltersChangeDeleted = useCallback((newFilters: CarFilters) => {
    setDeletedFilters(prev => ({
      ...newFilters,
      page: prev.page || 1,
      limit: prev.limit || 10,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const handlePageChangeDeleted = useCallback((page: number) => {
    setCurrentPageDeleted(page);
    setDeletedFilters(prev => ({ ...prev, page }));
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <CarList 
        cars={cars}
        carsDeleted={carsDeleted}
        carsMeta={carsMeta} 
        carsDeletedMeta={carsDeletedMeta} 
        colors={colors}
        brands={brands}
        years={years}
        onDelete={handleDelete}
        restoreCar={handleRestore}
        onDeletePermanently={handleDeletePermanently}
        onFiltersChange={handleFiltersChange}
        onFiltersChangeDeleted={handleFiltersChangeDeleted}
        onUpdateCar={handleUpdate}
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        currentPageDeleted={currentPageDeleted} 
        onPageChangeDeleted={handlePageChangeDeleted} 
      >
        <CarForm 
          mode="create"
          onSubmit={handleCreate} 
        />
      </CarList>
    </>
  );
};