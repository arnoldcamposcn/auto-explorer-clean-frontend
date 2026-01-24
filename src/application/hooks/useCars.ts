// application/hooks/useCars.ts
import { useEffect, useState, useCallback } from "react";
import { Car } from "../../domain/entities/car";
import { GetCarsUseCase } from "../../domain/use-cases/getCars";
import { GetCarsDeletedUseCase } from "../../domain/use-cases/getCarsDelete";
import { CreateCarUseCase } from "../../domain/use-cases/createCar";
import { DeleteCarUseCase } from "../../domain/use-cases/deleteCar";
import { CarRepositoryImpl } from "../../infrastructure/repositories/CarRepositoryImpl";

const carRepository = new CarRepositoryImpl();

const getCarsUseCase = new GetCarsUseCase(carRepository);
const getCarsDeletedUseCase = new GetCarsDeletedUseCase(carRepository);
const createCarUseCase = new CreateCarUseCase(carRepository);
const deleteCarUseCase = new DeleteCarUseCase(carRepository);

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [carsDeleted, setCarsDeleted] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCarsUseCase.execute();
      setCars(data);
      // console.log("data cars", data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar los autos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchCarsDeleted = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCarsDeletedUseCase.execute();
      setCarsDeleted(data);
      // console.log("data cars deleted", data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar los autos eliminados";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);


  const createCar = useCallback(async (car: Omit<Car, "id">) => {
    try {
      const newCar = await createCarUseCase.execute(car);
      setCars((prev) => [...prev, newCar]);
      return newCar;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear el auto";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteCar = useCallback(async (id: number) => {
    try {
      await deleteCarUseCase.execute(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar el auto";
      setError(errorMessage);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchCars();
    fetchCarsDeleted();
  }, [fetchCars, fetchCarsDeleted]);

  return {
    cars,
    carsDeleted,
    loading,
    error,
    createCar,
    deleteCar,
    refetch: fetchCars,
    refetchCarsDeleted: fetchCarsDeleted,
  };
};