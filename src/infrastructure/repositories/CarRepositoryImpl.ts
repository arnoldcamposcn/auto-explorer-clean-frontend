// infrastructure/repositories/CarRepositoryImpl.ts
import { ICarRepository } from "../../domain/repositories/CarRepository";
import { Brands, Car, Colors, Years } from "../../domain/entities/car";
import { carApi } from "../api/car.api";
import { CarFilters } from "../../shared/constants/queryKeys";

export class CarRepositoryImpl implements ICarRepository {

  async getAll(filters?: CarFilters): Promise<Car[]> {
    return await carApi.getAll(filters);
  }

  async getDeleted(filters?: CarFilters): Promise<Car[]> {
    return await carApi.getDeleted(filters);
  }

  async getById(id: number): Promise<Car> {
    return await carApi.getById(id);
  }
  
  async getColors(): Promise<Colors> {
    return await carApi.getColors();
  }

  async getBrands(): Promise<Brands> {
    return await carApi.getBrands();
  }

  async getYears(): Promise<Years> {
    return await carApi.getYears();
  }

  async create(payload: Omit<Car, "id">): Promise<Car> {
    return await carApi.create(payload);
  }

  async update(id: number, payload: Partial<Car>): Promise<Car> {
    return await carApi.update(id, payload);
  }

  async restore(id: number): Promise<Car>{
    return await carApi.restore(id);
  }

  async delete(id: number): Promise<void> {
    return await carApi.delete(id);
  }

  async deletePermanently(id:number): Promise<void>{
    return await carApi.deletePermanently(id);
  }
}
