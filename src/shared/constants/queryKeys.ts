export const carQueryKeys = {

  all: ['cars'] as const,
  lists: () => [...carQueryKeys.all, 'list'] as const,
  list: (filters?: CarFilters) =>
    [...carQueryKeys.lists(), 
     filters?.q ?? "",
     filters?.color ?? "", 
     filters?.brand ?? "",
     filters?.year ?? undefined,
     filters?.page ?? 1,
     filters?.limit ?? 10] as const,

     deleted: (filters?: CarFilters) => 
      [...carQueryKeys.all, 'deleted', 
       filters?.q ?? "",
       filters?.page ?? 1,
       filters?.limit ?? 10] as const,

  colors: () => [...carQueryKeys.all, 'colors'] as const,
  brands: () => [...carQueryKeys.all, 'brands'] as const,
  years: () => [...carQueryKeys.all, 'years'] as const,
  
} as const;

export interface CarFilters {
  q?: string;
  color?: string;
  brand?: string;
  year?: number;
  page?: number;
  limit?: number;
}