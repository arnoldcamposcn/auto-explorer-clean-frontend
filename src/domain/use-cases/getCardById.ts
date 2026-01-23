// domain/use-cases/getCarById.ts
import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";

export class GetCarByIdUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(id: number): Promise<Car> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return await this.carRepository.getById(id);
  }
}