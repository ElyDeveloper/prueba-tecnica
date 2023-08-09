import { Router } from "express";

import { getTareas, createNewTarea } from "../controllers/tareas.controller";

const router = Router();

router.get("/tareas", getTareas);
// router.get("/tareas/:id", getTareasById);
// router.get("/tareas/:busqueda", searchTareas);
router.post("/tareas", createNewTarea);
// router.put("/tareas/:id",updateTareas);
// router.delete("/tareas/:id", deleteTareas);


export default router;
