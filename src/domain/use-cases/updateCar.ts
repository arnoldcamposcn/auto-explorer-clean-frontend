import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";

export class UpdateCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(id: number, payload: Partial<Car>): Promise<Car> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }

    return await this.carRepository.update(id, payload);
  }
}