// presentation/components/molecules/CarsTable.tsx
import { Car } from "../../../domain/entities/car";
import { Pagination } from "./Pagination";

interface CarsTableProps {
  cars: Car[];
  showCarsDeleted: boolean;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
  onDeletePermanently: (id: number) => void;
  hasActiveFilters: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export const CarsTable = ({
  cars,
  showCarsDeleted,
  onEdit,
  onDelete,
  onRestore,
  onDeletePermanently,
  hasActiveFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  hasNextPage = false,
  hasPreviousPage = false,
}: CarsTableProps) => {
  return (
    <>
    <table className="w-full border-collapse border border-gray-200 rounded-md shadow-sm overflow-hidden">
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
        {cars.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-8 text-center text-gray-400 text-sm italic">
              {hasActiveFilters
                ? "No se encontraron resultados"
                : "No se encontraron registros"}
            </td>
          </tr>
        ) : (
          cars.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                        type="button"
                        className="text-red-600 hover:text-red-800 text-xs font-bold underline decoration-1 underline-offset-4"
                        onClick={() => onDeletePermanently(item.id)}
                      >
                        ELIMINAR PERMANENTEMENTE
                      </button>
                      <button
                        type="button"
                        onClick={() => onRestore(item.id)}
                        className="text-green-600 hover:text-green-800 text-xs font-bold underline decoration-1 underline-offset-4"
                      >
                        RESTAURAR
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 text-xs font-bold underline decoration-1 underline-offset-4"
                        onClick={() => onEdit(item)}
                      >
                        EDITAR
                      </button>
                      <button
                        type="button"
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


    {onPageChange && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      )}
    </>
  );
};