// application/hooks/useCars.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Car } from "../../domain/entities/car";
import { CarRepositoryImpl } from "../../infrastructure/repositories/CarRepositoryImpl";
import { DeletePermanentlyUseCase } from "../../domain/use-cases/deletePerm";
import { GetCarsUseCase } from "../../domain/use-cases/getCars";
import { GetCarsDeletedUseCase } from "../../domain/use-cases/getCarsDelete";
import { CreateCarUseCase } from "../../domain/use-cases/createCar";
import { GetColorsUseCase } from "../../domain/use-cases/getColors";
import { RestoreCarUseCase } from "../../domain/use-cases/restoreCar";
import { DeleteCarUseCase } from "../../domain/use-cases/deleteCar";
import { carQueryKeys, CarFilters } from "../../shared/constants/queryKeys";
import { GetBrandsUseCase } from "../../domain/use-cases/getBrands";
import { GetYearsUseCase } from "../../domain/use-cases/getYears";
import { UpdateCarUseCase } from "../../domain/use-cases/updateCar";
// import { useMemo } from "react";

// Instancias (puedes moverlas a un contexto/provider más adelante)
const carRepository = new CarRepositoryImpl();
const getCarsUseCase = new GetCarsUseCase(carRepository);
const getCarsDeletedUseCase = new GetCarsDeletedUseCase(carRepository);
const getColorsUseCase = new GetColorsUseCase(carRepository);
const getBrandsUseCase = new GetBrandsUseCase(carRepository);
const getYearsUseCase = new GetYearsUseCase(carRepository);
const createCarUseCase = new CreateCarUseCase(carRepository);
const deleteCarUseCase = new DeleteCarUseCase(carRepository);
const restoreCarUseCase = new RestoreCarUseCase(carRepository);
const deletePermanentlyUseCase = new DeletePermanentlyUseCase(carRepository);
const updateCarUseCase = new UpdateCarUseCase(carRepository);

export const useCars = (filters?: CarFilters, deletedFilters?: CarFilters) => {
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
    queryKey: carQueryKeys.deleted(deletedFilters), // Sin filtros
    queryFn: () => getCarsDeletedUseCase.execute(deletedFilters), // Sin filtros
  });

  const {
    data: colors = [],
    isLoading: loadingColors,
    error: errorColors,
  } = useQuery({
    queryKey: carQueryKeys.colors(),
    queryFn: () => getColorsUseCase.execute(),
  });

  const {
    data: brands = [],
    isLoading: loadingBrands,
    error: errorBrands,
  } = useQuery({
    queryKey: carQueryKeys.brands(),
    queryFn: () => getBrandsUseCase.execute(),
  });

  const {
    data: years = [],
    isLoading: loadingYears,
    error: errorYears,
  } = useQuery({
    queryKey: carQueryKeys.years(),
    queryFn: () => getYearsUseCase.execute(),
  });

  const loading = loadingCars || loadingDeleted || loadingColors || loadingBrands || loadingYears;
  const error = errorCars || errorDeleted || errorColors || errorBrands || errorYears;

  // Mutation para crear auto
  const createCarMutation = useMutation({
    mutationFn: (car: Omit<Car, "id">) => createCarUseCase.execute(car),
    onSuccess: () => {
      // Invalidar queries para refrescar la lista
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.colors() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.brands() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.years() });
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


  const updateCarMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Car> }) =>
      updateCarUseCase.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
    },
  });

  
  return {
    cars,
    carsDeleted,
    colors,
    brands,
    years,
    loading,
    error: error ? (error instanceof Error ? error.message : "Error desconocido") : null,
    createCar: createCarMutation.mutateAsync,
    deleteCar: deleteCarMutation.mutateAsync,
    restoreCar: restoreCarMutation.mutateAsync,
    deletePermanently: deletePermanentlyMutation.mutateAsync,
    updateCar: updateCarMutation.mutateAsync,
    refetch: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() }),
    refetchCarsDeleted: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() }),
  };
};