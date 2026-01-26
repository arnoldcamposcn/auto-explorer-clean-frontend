// domain/use-cases/restoreCar.ts
import { Car } from "../entities/car";
import { ICarRepository } from "../repositories/CarRepository";

export class RestoreCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(id: number): Promise<Car> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return await this.carRepository.restore(id);
  }
}