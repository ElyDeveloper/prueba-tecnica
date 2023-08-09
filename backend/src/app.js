import express from "express";
import config from "./config";
import cors from "cors"; // Importa el módulo CORS
import tareasRoutes from "./routes/tareas.routes"; // Importa tus rutas

const app = express();

const corsOptions = {
  origin: "*", // Cambia esto al dominio correcto o utiliza un arreglo de dominios permitidos para recibir peticiones by Eliezer Rivera
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// Settings
app.set("port", config.serverPort);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(tareasRoutes);

export default app;
