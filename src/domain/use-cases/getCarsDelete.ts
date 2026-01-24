import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";

export class GetCarsDeletedUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(): Promise<Car[]> {
    return await this.carRepository.getAllDeleted();
  }
}