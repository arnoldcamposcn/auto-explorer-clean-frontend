// application/hooks/useCars.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Car } from "../../domain/entities/car";
import { GetCarsUseCase } from "../../domain/use-cases/getCars";
import { GetCarsDeletedUseCase } from "../../domain/use-cases/getCarsDelete";
import { CreateCarUseCase } from "../../domain/use-cases/createCar";
import { DeleteCarUseCase } from "../../domain/use-cases/deleteCar";
import { CarRepositoryImpl } from "../../infrastructure/repositories/CarRepositoryImpl";
import { RestoreCarUseCase } from "../../domain/use-cases/restoreCar";
import { DeletePermanentlyUseCase } from "../../domain/use-cases/deletePerm";
import { carQueryKeys, CarFilters } from "../../shared/constants/queryKeys";
// import { useMemo } from "react";

// Instancias (puedes moverlas a un contexto/provider más adelante)
const carRepository = new CarRepositoryImpl();
const getCarsUseCase = new GetCarsUseCase(carRepository);
const getCarsDeletedUseCase = new GetCarsDeletedUseCase(carRepository);
const createCarUseCase = new CreateCarUseCase(carRepository);
const deleteCarUseCase = new DeleteCarUseCase(carRepository);
const restoreCarUseCase = new RestoreCarUseCase(carRepository);
const deletePermanentlyUseCase = new DeletePermanentlyUseCase(carRepository);

export const useCars = (filters?: CarFilters) => {
  // export const useCars = (filters?: CarFilters) => {
  const queryClient = useQueryClient();

  // Query para autos activos
  const {
    data: cars = [],
    isLoading: loadingCars,
    error: errorCars,
  } = useQuery({
    queryKey: carQueryKeys.list(filters),
    queryFn: () => getCarsUseCase.execute(filters),
  });

  // Query para autos eliminados
  const {
    data: carsDeleted = [],
    isLoading: loadingDeleted,
    error: errorDeleted,
  } = useQuery({
    queryKey: carQueryKeys.deleted(), // Sin filtros
    queryFn: () => getCarsDeletedUseCase.execute(), // Sin filtros
  });


  const loading = loadingCars || loadingDeleted;
  const error = errorCars || errorDeleted;

  // Mutation para crear auto
  const createCarMutation = useMutation({
    mutationFn: (car: Omit<Car, "id">) => createCarUseCase.execute(car),
    onSuccess: () => {
      // Invalidar queries para refrescar la lista
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
    },
  });

  // Mutation para eliminar (soft delete)
  const deleteCarMutation = useMutation({
    mutationFn: (id: number) => deleteCarUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  // Mutation para restaurar
  const restoreCarMutation = useMutation({
    mutationFn: (id: number) => restoreCarUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  // Mutation para eliminar permanentemente
  const deletePermanentlyMutation = useMutation({
    mutationFn: (id: number) => deletePermanentlyUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  return {
    cars,
    carsDeleted,
    loading,
    error: error ? (error instanceof Error ? error.message : "Error desconocido") : null,
    createCar: createCarMutation.mutateAsync,
    deleteCar: deleteCarMutation.mutateAsync,
    restoreCar: restoreCarMutation.mutateAsync,
    deletePermanently: deletePermanentlyMutation.mutateAsync,
    refetch: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() }),
    refetchCarsDeleted: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() }),
  };
};