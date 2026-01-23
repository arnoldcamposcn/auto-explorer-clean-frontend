// domain/use-cases/getCars.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";

export class GetCarsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(): Promise<Car[]> {
    return await this.carRepository.getAll();
  }
}