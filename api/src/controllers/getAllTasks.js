const db = require("../db");

const getAllTasks = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tasks", (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    // Devuelve los resultados como respuesta JSON
    res.json(result);
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = getAllTasks;
