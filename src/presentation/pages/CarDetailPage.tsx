// presentation/pages/CarDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { useCar } from "../../application/hooks/useCar";

export const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { car, loading, error } = useCar(Number(id));

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!car) {
    return (
      <div className="p-6">
        <p>Auto no encontrado</p>
        <Link to="/cars">Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/cars" className="text-blue-600 hover:underline mb-4 block">
        ← Volver a la lista
      </Link>
      
      <div className="bg-white border rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-4">
          {car.brand} {car.model}
        </h1>
        
        <div className="space-y-2">
          <p><strong>Marca:</strong> {car.brand}</p>
          <p><strong>Modelo:</strong> {car.model}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Año:</strong> {car.year ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
};