// presentation/pages/CarsPage.tsx
import { CarForm } from "../components/organisms/CarForm";
import { CarList } from "../components/organisms/CarList";
import { useCars } from "../../application/hooks/useCars";
import { toast } from "react-toastify";
import { Car } from "../../domain/entities/car";

export const CarsPage = () => {
  const { 
    cars, 
    carsDeleted, 
    loading, 
    error, 
    createCar, 
    deleteCar, 
    restoreCar,
    deletePermanently 
  } = useCars();

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


  const handleRestore = async (id: number) => {
    try {
      await restoreCar(id);

      toast.success("Auto restaurado correctamente");
    } catch {
      toast.error("Error al restaurar el auto");
    }
  }

  const handleDeletePermanently = async (id: number) => {
    try {
      await deletePermanently(id);
      toast.success("Auto eliminado permanentemente correctamente");
    } catch {
      toast.error("Error al eliminar el auto permanentemente");
    }
  }


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
      onDelete={handleDelete}
      restoreCar={handleRestore}
      onDeletePermanently={handleDeletePermanently}
    >
      <CarForm onSubmit={handleCreate} />
    </CarList>
  );
};