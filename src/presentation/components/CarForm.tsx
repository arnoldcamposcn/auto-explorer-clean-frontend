// presentation/components/CarForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  CarFormData,
  INITIAL_CAR_FORM_DATA,
  carFormSchema
} from "../../domain/entities/car";

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
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <input
          {...register("brand")}
          placeholder="Marca"
          className="border-2"
        />
        {errors.brand && (
          <span className="text-red-500 text-xs">
            {errors.brand.message}
          </span>
        )}
      </div>

      <div>
        <input
          {...register("model")}
          placeholder="Modelo"
          className="border-2"
        />
        {errors.model && (
          <span className="text-red-500 text-xs">
            {errors.model.message}
          </span>
        )}
      </div>

      <div>
        <input
          {...register("color")}
          placeholder="Color"
          className="border-2"
        />
        {errors.color && (
          <span className="text-red-500 text-xs">
            {errors.color.message}
          </span>
        )}
      </div>

      <div>
        <input
          {...register("year", { valueAsNumber: true })}
          type="number"
          placeholder="Año"
          className="border-2"
        />
        {errors.year && (
          <span className="text-red-500 text-xs">
            {errors.year.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando..." : "Crear auto"}
      </button>
    </form>
  );
};