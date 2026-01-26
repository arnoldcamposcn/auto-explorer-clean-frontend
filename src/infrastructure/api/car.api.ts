// infrastructure/api/car.api.ts
import { Car } from "../../domain/entities/car";
import { api } from "./axios.instance";
import { API_ENDPOINTS } from "../../shared/constants/api.endpoints";
import { CarFilters } from "../../shared/constants/queryKeys";


export const carApi = {

  getAll: async (filters?: CarFilters): Promise<Car[]> => {
    const { data } = await api.get<Car[]>(API_ENDPOINTS.CARS,
      {
        params: filters,
      });
    return data;
  },

  getAllDeleted: async (): Promise<Car[]> => {
    const { data } = await api.get<Car[]>(`${API_ENDPOINTS.CARS}/deleted`);
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

  restore : async (id: number): Promise<Car> => {
    const {data} = await api.patch<Car>(`${API_ENDPOINTS.CARS}/${id}/restore`);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.CARS}/${id}`);
  },

  removePermanently: async(id:number): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.CARS}/${id}/hard`);
  }
};