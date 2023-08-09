import sql from "mssql";

const dbSettings = {
  user: "tester",
  password: "user@test2023",
  server: "localhost",
  database: "DB_Test",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query("SELECT 1");
    console.log(result);
    return pool;
  } catch (error) {
    console.log(error);
  }
}
