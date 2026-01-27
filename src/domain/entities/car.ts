import z from "zod";

export const carSchema = z.object({
    id: z.number(),
    brand: z.string().min(1, "La marca es requerida"),
    model: z.string().min(1, "El modelo es requerido"),
    color: z.string().min(1, "El color es requerido"),
    year: z.number()
        .min(1900, "El año debe ser mayor a 1900")
        .max(new Date().getFullYear() + 1, "El año no puede ser futuro")
        .optional(),
});

export type Car = z.infer<typeof carSchema>;

// Tipo del formulario (sin id)
export const carFormSchema = carSchema.omit({ id: true });
// Tipo del formulario (sin id)
export type CarFormData = z.infer<typeof carFormSchema>;

// Valor inicial (instancia concreta)
// UPPER_SNAKE_CASE - "Esta es una constante
export const INITIAL_CAR_FORM_DATA: CarFormData = {
    brand: "",
    model: "",
    color: "",
    year: undefined,
};


// Para el endpoint de colores
export const colorsSchema = z.array(z.string().min(1, "El color no puede estar vacío"));

export type Colors = z.infer<typeof colorsSchema>; // string[]



// Para el endpoint de marcas
export const brandsSchema = z.array(z.string().min(1, "La marca es requerida"));

export type Brands = z.infer<typeof brandsSchema>


export const yearsSchema = z.array(z.number().min(1900, "El año debe ser mayor a 1900"));

export type Years = z.infer<typeof yearsSchema>