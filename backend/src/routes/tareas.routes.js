import { Router } from "express";

import {
  getTareas,
  createNewTarea,
  getTareaById,
  updateTarea,
  deleteTarea,
  getTareasActivas,
  getTareasInactivas,
  searchTareas,
} from "../controllers/tareas.controller";

const router = Router();

router.get("/tareas", getTareas);
router.get("/tareas/:id", getTareaById);
router.get("/tareas/activas", getTareasActivas);
router.get("/tareas/inactivas", getTareasInactivas);
router.get("/tareas/buscar/:busqueda", searchTareas);
router.post("/tareas", createNewTarea);
router.put("/tareas/:id",updateTarea);
router.delete("/tareas/:id", deleteTarea);

export default router;
