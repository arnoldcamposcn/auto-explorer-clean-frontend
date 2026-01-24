
import { ICarRepository } from "../repositories/CarRepository";

export class DeletePermanentlyUseCase {
    constructor(private carRepository: ICarRepository){}

    async execute(id: number): Promise<void> {

        if(!id || id <= 0){
            throw new Error("ID invalido");
        }
        return await this.carRepository.removePermanently(id);
    }
}

