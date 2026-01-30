// shared/constants/api.endpoints.ts

export const API_ENDPOINTS = {
  // Base endpoint
  CARS: "/cards",
  
  // Sub-rutas estáticas
  CARS_DELETED: "/cards/deleted",
  CARS_COLORS: "/cards/colors",
  CARS_BRANDS: "/cards/brands",
  CARS_YEARS: "/cards/years",
  
  // Funciones para rutas dinámicas (con ID)
  CAR_BY_ID: (id: number) => `/cards/${id}`,
  CAR_RESTORE: (id: number) => `/cards/${id}/restore`,
  CAR_HARD_DELETE: (id: number) => `/cards/${id}/hard`,
} as const;