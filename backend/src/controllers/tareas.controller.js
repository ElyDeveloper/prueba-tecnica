import { getConnection, sql } from "../database/connection";
import queries from "../database/queries_tareas";
import z from "zod";

export const getTareas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getTareas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTareaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .query(queries.getTareaById);
    console.log(result);

    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTareasActivas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getTareasActivas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTareasInactivas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getTareasInactivas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const searchTareas = async (req, res) => {
  try {
    const { busqueda } = req.params;

    const palabras = busqueda.split(" ");
    const formasVariantes = palabras.map((palabra) => `${palabra}`).join(" ~ ");
    console.log('Las formas variantes son: ',formasVariantes);

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("busqueda", sql.VarChar, formasVariantes)
      .query(queries.searchTareas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewTarea = async (req, res) => {
  try {
    // const tareaSchema = z.object({
    //   Nombre: z.string().min(3).max(50),
    //   Descripcion: z.string().min(3).max(250),
    //   Prioridad: z.string().min(3).max(50),
    //   Estado: z.number().min(1).max(1),
    // });
    const { Nombre, Descripcion, Prioridad, Estado } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("DescripcionTarea", sql.VarChar, Descripcion)
      .input("Prioridad", sql.VarChar, Prioridad)
      .input("Estado", sql.Bit, Estado)
      .query(queries.createNewTarea);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, Prioridad, Estado } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .input("Nombre", sql.VarChar, Nombre)
      .input("DescripcionTarea", sql.VarChar, Descripcion)
      .input("Prioridad", sql.VarChar, Prioridad)
      .input("Estado", sql.Bit, Estado)
      .query(queries.updateTarea);

    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .query(queries.deleteTarea);

    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
