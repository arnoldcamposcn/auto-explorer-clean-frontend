import { Car } from "../entities/car";
import { ICarRepository } from "../repositories/CarRepository";

export class RestoreCarUseCase {
    constructor(private carRepository: ICarRepository){}

    async execute(id: number): Promise<Car>{
        return await this.carRepository.restore(id);
    }
}