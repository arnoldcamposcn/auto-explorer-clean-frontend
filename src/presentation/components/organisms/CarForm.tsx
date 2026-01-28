// presentation/components/CarForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  CarFormData,
  INITIAL_CAR_FORM_DATA,
  carFormSchema
} from "../../../domain/entities/car";
import { Input } from "../atoms/input";
import { Button } from "../atoms/Button";

interface Props {
  onSubmit: (data: CarFormData) => Promise<void>;

}

export const CarForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: INITIAL_CAR_FORM_DATA,
  });

  const onSubmitForm = async (data: CarFormData) => {
    try {
      await onSubmit(data);
      toast.success("Auto creado correctamente");
      reset();
    } catch (error) {
      toast.error("Error al crear el auto. Por favor, intenta nuevamente.");
      // Solo mostrar error en consola en desarrollo
      if (import.meta.env.DEV) {
        console.error(error);
      }
      // console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <Input {...register("brand")} placeholder="Marca" />

        {errors.brand && (
          <span className="text-red-500 text-xs">
            {errors.brand.message}
          </span>
        )}
      </div>

      <div>
        <Input {...register("model")} placeholder="Modelo" />

        {errors.model && (
          <span className="text-red-500 text-xs">
            {errors.model.message}
          </span>
        )}
      </div>

      <div>
        <Input {...register("color")} placeholder="Color" />

        {errors.color && (
          <span className="text-red-500 text-xs">
            {errors.color.message}
          </span>
        )}
      </div>

      <div>
        <Input {...register("year", { valueAsNumber: true })} 
        type="number" placeholder="Año" />
        
        {errors.year && (
          <span className="text-red-500 text-xs">
            {errors.year.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando..." : "Crear Auto"}
      </Button>
    </form>
  );
};