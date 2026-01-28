import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";
import { CarFilters } from "../../shared/constants/queryKeys";

export class GetCarsDeletedUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(filters?: CarFilters): Promise<Car[]> {
    // Sin filtros - siempre trae todos los eliminados
    return await this.carRepository.getAllDeleted(filters);
  }
}