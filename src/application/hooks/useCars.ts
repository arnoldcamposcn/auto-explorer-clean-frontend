// application/hooks/useCars.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Car, PaginationMeta } from "../../domain/entities/car";
import { carQueryKeys, CarFilters } from "../../shared/constants/queryKeys";
import { DIContainer } from "../di/container";

export const useCars = (filters?: CarFilters, deletedFilters?: CarFilters) => {
  const queryClient = useQueryClient();
  
  const queries = DIContainer.getQueries();
  const mutations = DIContainer.getMutations();

  const {
    data: carsResponse, 
    isLoading: loadingCars,
    error: errorCars,
  } = useQuery({
    queryKey: carQueryKeys.list(filters),
    queryFn: () => queries.cars.execute(filters),
  });

  const cars = carsResponse?.data || [];
  const carsMeta: PaginationMeta | undefined = carsResponse?.meta;

  const {
    data: deletedResponse,
    isLoading: loadingDeleted,
    error: errorDeleted,
  } = useQuery({
    queryKey: carQueryKeys.deleted(deletedFilters),
    queryFn: () => queries.carsDeleted.execute(deletedFilters),
  });

  const carsDeleted = deletedResponse?.data || [];
  const carsDeletedMeta: PaginationMeta | undefined = deletedResponse?.meta;


  const {
    data: colors = [],
    isLoading: loadingColors,
    error: errorColors,
  } = useQuery({
    queryKey: carQueryKeys.colors(),
    queryFn: () => queries.colors.execute(),
  });

  const {
    data: brands = [],
    isLoading: loadingBrands,
    error: errorBrands,
  } = useQuery({
    queryKey: carQueryKeys.brands(),
    queryFn: () => queries.brands.execute(),
  });

  const {
    data: years = [],
    isLoading: loadingYears,
    error: errorYears,
  } = useQuery({
    queryKey: carQueryKeys.years(),
    queryFn: () => queries.years.execute(),
  });

  const loading = loadingCars || loadingDeleted || loadingColors || loadingBrands || loadingYears;
  const error = errorCars || errorDeleted || errorColors || errorBrands || errorYears;

  
  const createCarMutation = useMutation({
    mutationFn: (car: Omit<Car, "id">) => mutations.create.execute(car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.colors() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.brands() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.years() });
    },
  });

  // Mutation para eliminar (soft delete)
  const deleteCarMutation = useMutation({
    mutationFn: (id: number) => mutations.delete.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  // Mutation para eliminar permanentemente
  const deletePermanentlyMutation = useMutation({
    mutationFn: (id: number) => mutations.deletePermanently.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  // Mutation para restaurar
  const restoreCarMutation = useMutation({
    mutationFn: (id: number) => mutations.restore.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() });
    },
  });

  // Mutation para actualizar
  const updateCarMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Car> }) =>
      mutations.update.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() });
    },
  });

  return {
    cars,
    carsDeleted,
    carsMeta,
    carsDeletedMeta,
    colors,
    brands,
    years,
    loading,
    error: error ? (error instanceof Error ? error.message : "Error desconocido") : null,
    createCar: createCarMutation.mutateAsync,
    deleteCar: deleteCarMutation.mutateAsync,
    restoreCar: restoreCarMutation.mutateAsync,
    deletePermanently: deletePermanentlyMutation.mutateAsync,
    updateCar: (id: number, payload: Partial<Car>) =>
      updateCarMutation.mutateAsync({ id, payload }),
    refetch: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.lists() }),
    refetchCarsDeleted: () => queryClient.invalidateQueries({ queryKey: carQueryKeys.deleted() }),
  };
};