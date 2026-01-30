
import { Brands, Car, Colors, Years } from "../entities/car";
import { CarFilters } from "../../shared/constants/queryKeys";

export interface ICarRepository {
  getAll(filters?: CarFilters): Promise<Car[]>;
  getDeleted(filters?: CarFilters): Promise<Car[]>;
  getById(id: number): Promise<Car>;
  getColors(): Promise<Colors>;
  getBrands(): Promise<Brands>;
  getYears(): Promise<Years>;
  create(payload: Omit<Car, "id">): Promise<Car>;
  update(id: number, payload: Partial<Car>): Promise<Car>;
  restore(id: number): Promise<Car>;
  delete(id: number): Promise<void>;
  deletePermanently(id: number): Promise<void>;
}