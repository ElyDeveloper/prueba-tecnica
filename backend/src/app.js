import express from "express";
import config from "./config";
import tareasRoutes from "./routes/tareas.routes";

const app = express();

//settings
app.set("port", config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(tareasRoutes);

export default app;
