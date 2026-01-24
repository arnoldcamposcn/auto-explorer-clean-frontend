// // application/hooks/useCar.ts
// import { useEffect, useState } from "react";
// import { Car } from "../../domain/entities/car";
// import { GetCarByIdUseCase } from "../../domain/use-cases/getCardById";
// import { CarRepositoryImpl } from "../../infrastructure/repositories/CarRepositoryImpl";

// const carRepository = new CarRepositoryImpl();
// const getCarByIdUseCase = new GetCarByIdUseCase(carRepository);

// export const useCar = (id: number) => {
//   const [car, setCar] = useState<Car | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchCar = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await getCarByIdUseCase.execute(id);
//         setCar(data);
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : "Error al cargar el auto";
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   return { car, loading, error };
// };