// domain/use-cases/getColors.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Years } from "../entities/car";

export class GetYearsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(): Promise<Years> {
    return await this.carRepository.getYears();
  }
}