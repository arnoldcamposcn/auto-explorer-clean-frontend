// presentation/pages/CarsPage.tsx
import { CarForm } from "../components/organisms/CarForm";
import { CarList } from "../components/organisms/CarList";
import { useCars } from "../../application/hooks/useCars";
import { toast } from "react-toastify";
import { Car } from "../../domain/entities/car";


export const CarsPage = () => {
  const { cars, carsDeleted, loading, error, createCar, deleteCar } = useCars();

  const handleCreate = async (carData: Omit<Car, "id">) => {
    try {
      await createCar(carData);
      toast.success("Auto creado correctamente");
    } catch {
      toast.error("Error al crear el auto");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      toast.success("Auto eliminado correctamente");
    } catch {
      toast.error("Error al eliminar el auto");
    }
  };

  if (loading) {
    return <div className="p-6">Cargando autos...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <CarList cars={cars} 
    carsDeleted={carsDeleted} 
    onDelete={handleDelete}>
      <CarForm onSubmit={handleCreate} />
    </CarList>
  );
};