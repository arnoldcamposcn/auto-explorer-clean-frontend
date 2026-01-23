// infrastructure/repositories/CarRepositoryImpl.ts
import { ICarRepository } from "../../domain/repositories/CarRepository";
import { Car } from "../../domain/entities/car";
import { carApi } from "../api/car.api";

export class CarRepositoryImpl implements ICarRepository {
  async getAll(): Promise<Car[]> {
    return await carApi.getAll();
  }

  async getById(id: number): Promise<Car> {
    return await carApi.getById(id);
  }

  async create(payload: Omit<Car, "id">): Promise<Car> {
    return await carApi.create(payload);
  }

  async update(id: number, payload: Partial<Car>): Promise<Car> {
    return await carApi.update(id, payload);
  }

  async remove(id: number): Promise<void> {
    return await carApi.remove(id);
  }
}