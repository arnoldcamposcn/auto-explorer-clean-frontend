// domain/repositories/CarRepository.ts
import { Car } from "../entities/car";

export interface ICarRepository {
  getAll(): Promise<Car[]>;
  getById(id: number): Promise<Car>;
  create(payload: Omit<Car, "id">): Promise<Car>;
  update(id: number, payload: Partial<Car>): Promise<Car>;
  remove(id: number): Promise<void>;
}