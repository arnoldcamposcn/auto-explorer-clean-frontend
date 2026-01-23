// infrastructure/api/car.api.ts
// import { Car } from "../../types/cars";
import { Car } from "../../domain/entities/car";
import { api } from "./axios.instance";
import { API_ENDPOINTS } from "../../shared/constants/api.endpoints";

export const carApi = {
  getAll: async (): Promise<Car[]> => {
    const { data } = await api.get<Car[]>(API_ENDPOINTS.CARS);
    return data;
  },

  getById: async (id: number): Promise<Car> => {
    const { data } = await api.get<Car>(`${API_ENDPOINTS.CARS}/${id}`);
    return data;
  },

  create: async (payload: Omit<Car, "id">): Promise<Car> => {
    const { data } = await api.post<Car>(API_ENDPOINTS.CARS, payload);
    return data;
  },

  update: async (id: number, payload: Partial<Car>): Promise<Car> => {
    const { data } = await api.patch<Car>(`${API_ENDPOINTS.CARS}/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.CARS}/${id}`);
  },
};