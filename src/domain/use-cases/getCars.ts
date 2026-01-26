// domain/use-cases/getCars.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";
import { CarFilters } from "../../shared/constants/queryKeys";

export class GetCarsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(filters?: CarFilters): Promise<Car[]> {
    return await this.carRepository.getAll(filters);
  }
}