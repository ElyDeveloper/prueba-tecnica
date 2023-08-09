import z from "zod";
const tareaSchema = z.object({
  Nombre: z
    .string({
      invalid_type_error: "El nombre debe ser una cadena de caracteres",
      required_error: "El nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener máximo 50 caracteres",
    }),
  Descripcion: z
    .string({
      invalid_type_error: "La descripción debe ser una cadena de caracteres",
      required_error: "La descripción es requerida",
    })
    .min(3, {
      message: "La descripción debe tener al menos 3 caracteres",
    })
    .max(250, {
      message: "La descripción debe tener máximo 250 caracteres",
    }),
  Prioridad: z
    .string({
      invalid_type_error: "La prioridad debe ser una cadena de caracteres",
      required_error: "La prioridad es requerida",
    })
    .min(3, {
      message: "La prioridad debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "La prioridad debe tener máximo 50 caracteres",
    }),
  Estado: z
    .number({
      invalid_type_error: "El estado debe ser un número",
      required_error: "El estado es requerido",
    })
    .int({
      invalid_type_error: "El estado debe ser un número entero",
    })
    .min(0, {
      message: "El estado debe ser solo 1 o 0",
    })
    .max(1, {
      message: "El estado debe ser solo 1 o 0",
    }),
});

export function validarTarea(tarea) {
  const tareaValidada = tareaSchema.safeParse(tarea);
  return tareaValidada;
}
