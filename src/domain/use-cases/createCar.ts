import { ICarRepository } from "../repositories/CarRepository";
import { Car } from "../entities/car";  

export class CreateCarUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(car: Omit<Car, "id">): Promise<Car> {
    return await this.carRepository.create(car);
  }
}