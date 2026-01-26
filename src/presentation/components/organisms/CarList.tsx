// presentation/components/organisms/CarList.tsx
import { useDebounce } from "../../../application/hooks/useDebounce";
import { Car } from "../../../domain/entities/car";
import { ReactNode, useState, useEffect } from "react";
import { CarFilters } from "../../../shared/constants/queryKeys";

interface Props {
  cars: Car[];
  carsDeleted: Car[];
  onDelete: (id: number) => void;
  onDeletePermanently: (id: number) => void;
  restoreCar: (id: number) => void;
  onFiltersChange?: (filters: CarFilters) => void; // Corregir typo
  children?: ReactNode;
}

export const CarList = ({
  cars,
  carsDeleted,
  onDelete,
  restoreCar,
  onDeletePermanently,
  onFiltersChange,
  children,
}: Props) => {
  const [showCarsDeleted, setShowCarsDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  

  useEffect(() => {
    onFiltersChange?.(
      debouncedSearch.trim()
      ? { q: debouncedSearch.trim() } : {}
    );
  }, [debouncedSearch, onFiltersChange]);



  const carsToShow = showCarsDeleted ? carsDeleted : cars;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
          Panel Administrativo de Autos
        </h1>
        <p className="text-gray-500 text-sm">Control de inventario de flota</p>
      </div>

      <div className="bg-white">
        {children && !showCarsDeleted && (
          <div className="mb-6">
            {children}
          </div>
        )}

        <div className="mb-6 flex justify-between items-center gap-4">
          {/* Input SOLO para autos disponibles */}
          {!showCarsDeleted && (
            <input
              type="text"
              placeholder="Buscar por marca, modelo o color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
              className="flex-1 max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="button"
            className="flex gap-4 p-4 bg-amber-400 cursor-pointer hover:bg-amber-500 transition-colors rounded"
            onClick={() => setShowCarsDeleted(!showCarsDeleted)}
          >
            {showCarsDeleted ? "Autos Disponibles" : "Autos Eliminados"}
            <span className="text-white font-bold">
              {showCarsDeleted ? "🟢" : "🔴"}
            </span>
          </button>
        </div>


        <table className="w-full border-collapse border border-gray-200 rounded-md shadow-sm overflow-hidden">
          {/* ... resto de la tabla sin cambios ... */}
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase border-r border-blue-600 last:border-r-0">
                Marca
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase border-r border-blue-600 last:border-r-0">
                Modelo
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase border-r border-blue-600 last:border-r-0">
                Color
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase border-r border-blue-600 last:border-r-0">
                Año
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {carsToShow.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm italic">
                  {searchTerm ? "No se encontraron resultados" : "No se encontraron registros"}
                </td>
              </tr>
            ) : (
              carsToShow.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {/* ... celdas de la tabla sin cambios ... */}
                  <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-100 font-medium text-center">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-100 font-medium text-center">
                    {item.model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-100 text-center">
                    {item.color}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-100 text-center">
                    {item.year ?? "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-6 justify-center">
                      {showCarsDeleted ? (
                        <>
                          <button
                            className="text-red-600 hover:text-red-800 text-xs font-bold underline decoration-1 underline-offset-4"
                            onClick={() => onDeletePermanently(item.id)}
                          >
                            ELIMINAR PERMANENTEMENTE
                          </button>
                          <button
                            onClick={() => restoreCar(item.id)}
                            className="text-green-600 hover:text-green-800 text-xs font-bold underline decoration-1 underline-offset-4"
                          >
                            RESTAURAR
                          </button>
                        </>
                      ) : (
                        <>


                          <button
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold underline decoration-1 underline-offset-4"
                          >
                            EDITAR
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-bold underline decoration-1 underline-offset-4"
                          >
                            ELIMINAR
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};