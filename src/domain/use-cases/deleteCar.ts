import { ICarRepository } from "../repositories/CarRepository";

export class DeleteCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return await this.carRepository.delete(id);
  }
}