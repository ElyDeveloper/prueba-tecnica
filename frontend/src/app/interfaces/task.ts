export interface Task {
  ID?: number;
  Nombre: string;
  DescripcionTarea: string;
  FechaCreacion?: string;
  FechaVencimiento?: string;
  Prioridad: string;
  Estado?: boolean | number;
}
