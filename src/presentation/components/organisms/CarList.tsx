    import { Car } from "../../../domain/entities/car";
    import { ReactNode, useState } from "react";

    interface Props {
      cars: Car[];
      carsDeleted: Car[];
      onDelete: (id: number) => void;
      children?: ReactNode;
    }

    export const CarList = ({ cars, carsDeleted, onDelete, children }: Props) => {
      const [showCarsDeleted, setShowCarsDeleted] = useState(false);

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
            {children && (
              <div className="mb-6">
                {children}
              </div>
            )}

            <div className="mb-6 flex justify-end">
              <button
                className="flex gap-4 p-4 bg-amber-400 cursor-pointer"
                onClick={() => setShowCarsDeleted(!showCarsDeleted)}
              >
                {showCarsDeleted ? "Autos Disponibles" : "Autos Eliminados"}
                <span className="text-white font-bold">
                  {showCarsDeleted ? "🟢" : "🔴"}
                </span>
              </button>
            </div>


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
                {carsToShow.map((item) => (
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
                        {/* <Link
                          to={`/cars/${item.id}`}
                          className="text-blue-600 hover:text-blue-800 text-xs font-bold underline decoration-1 underline-offset-4"
                        >
                          VER DETALLE
                        </Link> */}
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

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {cars.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm italic">
                No se encontraron registros en el sistema.
              </div>
            )}
          </div>
        </div>
      );
    };