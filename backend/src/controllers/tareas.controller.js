import { getConnection, sql } from "../database/connection";
import queries from "../database/queries_tareas";
import { validarTarea } from "../schemas/tareas";

export const getTareas = async (req, res) => {
  const pool = await getConnection();
  try {
    const result = await pool.request().query(queries.getTareas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const getTareaById = async (req, res) => {
  const pool = await getConnection();
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .query(queries.getTareaById);
    console.log(result);

    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const getTareasActivas = async (req, res) => {
  const pool = await getConnection();
  try {
    const result = await pool.request().query(queries.getTareasActivas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const getTareasInactivas = async (req, res) => {
  const pool = await getConnection();
  try {
    const result = await pool.request().query(queries.getTareasInactivas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const searchTareas = async (req, res) => {
  const pool = await getConnection();

  try {
    const { busqueda } = req.params;

    const palabras = busqueda.split(" ");
    const formasVariantes = palabras.map((palabra) => `${palabra}`).join(" ~ ");
    console.log("Las formas variantes son: ", formasVariantes);

    const result = await pool
      .request()
      .input("busqueda", sql.VarChar, formasVariantes)
      .query(queries.searchTareas);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const createNewTarea = async (req, res) => {
  const pool = await getConnection();

  try {
    const result = validarTarea(req.body);
    if (!result.success) {
      res.status(422).json({
        error: JSON.parse(result.error.message),
      });
      return;
    }

    const newTarea = {
      ...result.data,
    };

    const resultPool = await pool
      .request()
      .input("Nombre", sql.VarChar, newTarea.Nombre)
      .input("DescripcionTarea", sql.VarChar, newTarea.Descripcion)
      .input("Prioridad", sql.VarChar, newTarea.Prioridad)
      .input("Estado", sql.Bit, newTarea.Estado)
      .query(queries.createNewTarea);
    res.json(resultPool);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const updateTarea = async (req, res) => {
  const pool = await getConnection();
  try {
    const { id } = req.params;
    const result = validarTarea(req.body);
    if (!result.success) {
      res.status(422).json({
        error: JSON.parse(result.error.message),
      });
      return;
    }

    const tareaUpdate = {
      ...result.data,
    };

    const resultPool = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .input("Nombre", sql.VarChar, tareaUpdate.Nombre)
      .input("DescripcionTarea", sql.VarChar, tareaUpdate.Descripcion)
      .input("Prioridad", sql.VarChar, tareaUpdate.Prioridad)
      .input("Estado", sql.Bit, tareaUpdate.Estado)
      .query(queries.updateTarea);

    res.json(resultPool);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  } finally {
    pool.close();
  }
};

export const deleteTarea = async (req, res) => {
  const pool = await getConnection();
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .input("IdTarea", sql.Int, id)
      .query(queries.deleteTarea);

    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    pool.close();
  }
};
