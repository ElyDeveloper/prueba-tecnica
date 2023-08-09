import { getConnection } from "../database/connection";

export const getTareas = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM tb_tareas");
    console.log(result);

    res.json(result.recordset);
}

export const createNewTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("titulo", sql.VarChar, titulo)
        .input("descripcion", sql.Text, descripcion)
        .query("INSERT INTO tb_tareas VALUES (@titulo, @descripcion)");
    res.json(result);
}