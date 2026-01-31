// infrastructure/api/car.api.ts
import { Brands, Car, Colors, Years, PaginationResponse } from "../../domain/entities/car";
import { api } from "./axios.instance";
import { API_ENDPOINTS } from "../../shared/constants/api.endpoints";
import { CarFilters } from "../../shared/constants/queryKeys";

  export const carApi = {
    
    getAll: async (filters?: CarFilters): Promise<PaginationResponse<Car>> => {
      const { data } = await api.get<PaginationResponse<Car>>(API_ENDPOINTS.CARS, {
        params: filters,
      });
      return data;
    },
    
    getDeleted: async (filters?: CarFilters): Promise<PaginationResponse<Car>> => {
      const { data } = await api.get<PaginationResponse<Car>>(API_ENDPOINTS.CARS_DELETED, {
        params: filters,
      });
      return data;
    },
  
    getById: async (id: number): Promise<Car> => {
      const { data } = await api.get<Car>(API_ENDPOINTS.CAR_BY_ID(id));
      return data;
    },
  
    getColors: async (): Promise<Colors> => {
      const { data } = await api.get<Colors>(API_ENDPOINTS.CARS_COLORS);
      return data;
    },
  
    getBrands: async (): Promise<Brands> => {
      const { data } = await api.get<Brands>(API_ENDPOINTS.CARS_BRANDS);
      return data;
    },
  
    getYears: async (): Promise<Years> => {
      const { data } = await api.get<Years>(API_ENDPOINTS.CARS_YEARS);
      return data;
    },
  
    create: async (payload: Omit<Car, "id">): Promise<Car> => {
      const { data } = await api.post<Car>(API_ENDPOINTS.CARS, payload);
      return data;
    },
  
    update: async (id: number, payload: Partial<Car>): Promise<Car> => {
      const { data } = await api.patch<Car>(API_ENDPOINTS.CAR_BY_ID(id), payload);
      return data;
    },
  
    restore: async (id: number): Promise<Car> => {
      const { data } = await api.patch<Car>(API_ENDPOINTS.CAR_RESTORE(id));
      return data;
    },
  
    delete: async (id: number): Promise<void> => {
      await api.delete(API_ENDPOINTS.CAR_BY_ID(id));
    },
  
    deletePermanently: async (id: number): Promise<void> => {
      await api.delete(API_ENDPOINTS.CAR_HARD_DELETE(id));
    },
  };