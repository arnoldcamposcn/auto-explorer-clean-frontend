// application/di/container.ts
import { ICarRepository } from "../../domain/repositories/CarRepository";
import { CarRepositoryImpl } from "../../infrastructure/repositories/CarRepositoryImpl";
import { GetCarsUseCase } from "../../domain/use-cases/getCars";
import { GetCarsDeletedUseCase } from "../../domain/use-cases/getCarsDelete";
import { GetColorsUseCase } from "../../domain/use-cases/getColors";
import { GetBrandsUseCase } from "../../domain/use-cases/getBrands";
import { GetYearsUseCase } from "../../domain/use-cases/getYears";
import { CreateCarUseCase } from "../../domain/use-cases/createCar";
import { UpdateCarUseCase } from "../../domain/use-cases/updateCar";
import { DeleteCarUseCase } from "../../domain/use-cases/deleteCar";
import { RestoreCarUseCase } from "../../domain/use-cases/restoreCar";
import { DeletePermanentlyUseCase } from "../../domain/use-cases/deletePerm";

/**
 * Dependency Injection Container
 * Centraliza la creación de instancias y permite inyección de dependencias
 * para facilitar testing y desacoplamiento
 */
class DIContainer {
  private static carRepository: ICarRepository | null = null;
  private static queries: {
    cars: GetCarsUseCase;
    carsDeleted: GetCarsDeletedUseCase;
    colors: GetColorsUseCase;
    brands: GetBrandsUseCase;
    years: GetYearsUseCase;
  } | null = null;
  
  private static mutations: {
    create: CreateCarUseCase;
    update: UpdateCarUseCase;
    delete: DeleteCarUseCase;
    restore: RestoreCarUseCase;
    deletePermanently: DeletePermanentlyUseCase;
  } | null = null;

  /**
   * Obtiene la instancia del repositorio (Singleton)
   */
  static getCarRepository(): ICarRepository {
    if (!this.carRepository) {
      this.carRepository = new CarRepositoryImpl();
    }
    return this.carRepository;
  }

  /**
   * Obtiene las instancias de casos de uso para queries
   */
  static getQueries() {
    if (!this.queries) {
      const repo = this.getCarRepository();
      this.queries = {
        cars: new GetCarsUseCase(repo),
        carsDeleted: new GetCarsDeletedUseCase(repo),
        colors: new GetColorsUseCase(repo),
        brands: new GetBrandsUseCase(repo),
        years: new GetYearsUseCase(repo),
      };
    }
    return this.queries;
  }

  /**
   * Obtiene las instancias de casos de uso para mutations
   */
  static getMutations() {
    if (!this.mutations) {
      const repo = this.getCarRepository();
      this.mutations = {
        create: new CreateCarUseCase(repo),
        update: new UpdateCarUseCase(repo),
        delete: new DeleteCarUseCase(repo),
        restore: new RestoreCarUseCase(repo),
        deletePermanently: new DeletePermanentlyUseCase(repo),
      };
    }
    return this.mutations;
  }

  /**
   * Permite inyectar un repositorio mock para testing
   * @param repo - Repositorio a inyectar (normalmente un mock)
   */
  static setCarRepository(repo: ICarRepository): void {
    this.carRepository = repo;
    // Reset queries y mutations para que usen el nuevo repositorio
    this.queries = null;
    this.mutations = null;
  }

  /**
   * Resetea todas las instancias (útil para testing)
   */
  static reset(): void {
    this.carRepository = null;
    this.queries = null;
    this.mutations = null;
  }
}

export { DIContainer };