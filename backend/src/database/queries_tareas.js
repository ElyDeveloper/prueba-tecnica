export default {
  getTareas: `
  SELECT *
  FROM tb_tareas
  ORDER BY
    CASE Prioridad
      WHEN 'Alta' THEN 1
      WHEN 'Media' THEN 2
      WHEN 'Baja' THEN 3
      ELSE 4
    END ASC
`,
  getTareaById: "SELECT * FROM tb_tareas WHERE ID = @IdTarea",
  getTareasActivas: "SELECT * FROM tb_tareas WHERE Estado = 1",
  getTareasInactivas: "SELECT * FROM tb_tareas WHERE Estado = 0",
  searchTareas: `
  SELECT * FROM tb_tareas
  WHERE CONTAINS(DescripcionTarea, @busqueda);
  `,
  createNewTarea:
    "INSERT INTO tb_tareas (Nombre, DescripcionTarea, Prioridad, Estado) VALUES (@Nombre, @DescripcionTarea, @Prioridad, @Estado)",
  updateTarea:
    "UPDATE tb_tareas SET Nombre = @Nombre, DescripcionTarea = @DescripcionTarea, Prioridad = @Prioridad, Estado = @Estado WHERE ID = @IdTarea",
  deleteTarea: "DELETE FROM tb_tareas WHERE ID = @IdTarea",
};
