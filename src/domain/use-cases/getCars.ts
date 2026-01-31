// domain/use-cases/getCars.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Car, PaginationResponse } from "../entities/car";
import { CarFilters } from "../../shared/constants/queryKeys";

export class GetCarsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(filters?: CarFilters): Promise<PaginationResponse<Car>> {
    return await this.carRepository.getAll(filters);
  }
}