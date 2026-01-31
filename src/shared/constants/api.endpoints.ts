// shared/constants/api.endpoints.ts

export const API_ENDPOINTS = {
  // Base endpoint
  CARS: "/cars",
  
  // Sub-rutas estáticas
  CARS_DELETED: "/cars/deleted",
  CARS_COLORS: "/cars/colors",
  CARS_BRANDS: "/cars/brands",
  CARS_YEARS: "/cars/years",
  
  // Funciones para rutas dinámicas (con ID)
  CAR_BY_ID: (id: number) => `/cars/${id}`,
  CAR_RESTORE: (id: number) => `/cars/${id}/restore`,
  CAR_HARD_DELETE: (id: number) => `/cars/${id}/hard`,
} as const;