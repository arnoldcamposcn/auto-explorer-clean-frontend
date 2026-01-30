// presentation/components/CarForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  CarFormData,
  INITIAL_CAR_FORM_DATA,
  carFormSchema
} from "../../../domain/entities/car";
import { Input } from "../atoms/input";
import { Button } from "../atoms/Button";

type Mode = "create" | "update";

interface Props {
  mode: Mode;
  initialValues?: CarFormData;
  onSubmit: (data: CarFormData) => Promise<void>;
}

export const CarForm = ({ mode, initialValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: initialValues ?? INITIAL_CAR_FORM_DATA,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const onSubmitForm = async (data: CarFormData) => {
    try {
      await onSubmit(data);
      if (mode === "create") {
        reset();
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Marca</label>
        <Input {...register("brand")} placeholder="Marca" />
        {errors.brand && (
          <span className="text-red-500 text-xs">
            {errors.brand.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Modelo</label>
        <Input {...register("model")} placeholder="Modelo" />
        {errors.model && (
          <span className="text-red-500 text-xs">
            {errors.model.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Color</label>
        <Input {...register("color")} placeholder="Color" />
        {errors.color && (
          <span className="text-red-500 text-xs">
            {errors.color.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Año</label>
        <Input 
          {...register("year", { valueAsNumber: true })} 
          type="number" 
          placeholder="Año" 
        />
        {errors.year && (
          <span className="text-red-500 text-xs">
            {errors.year.message}
          </span>
        )}
      </div>

      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (mode === "create" ? "Creando..." : "Actualizando...") 
            : (mode === "create" ? "Crear Auto" : "Actualizar Auto")}
        </Button>
      </div>
    </form>
  );
};