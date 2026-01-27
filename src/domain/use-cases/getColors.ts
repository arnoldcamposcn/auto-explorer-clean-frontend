// domain/use-cases/getColors.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Colors } from "../entities/car";

export class GetColorsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(): Promise<Colors> { // En lugar de Promise<string[]>
    return await this.carRepository.getColors();
  }
}