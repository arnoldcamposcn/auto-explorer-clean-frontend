export const carQueryKeys = {
    all: ['cars'] as const,
    lists: () => [...carQueryKeys.all, 'list'] as const,

    list: (filters?: CarFilters) =>
      [...carQueryKeys.lists(), filters?.q ?? ""] as const,
    
    
    deleted: (filters?: CarFilters) => [...carQueryKeys.all, 'deleted', filters] as const,
    detail: (id: number) => [...carQueryKeys.all, 'detail', id] as const,
  } as const;
  
  export interface CarFilters {
    q?: string;
    // year?: number;
    // color?: string;
    // brand?: string;
  }