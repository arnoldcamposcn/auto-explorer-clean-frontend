// domain/use-cases/getColors.ts
import { Brands } from "../entities/car";
import { ICarRepository } from "../repositories/CarRepository";

export class GetBrandsUseCase {
  constructor(private carRepository: ICarRepository) {}

  async execute(): Promise<Brands> {
    return await this.carRepository.getBrands();
  }
}