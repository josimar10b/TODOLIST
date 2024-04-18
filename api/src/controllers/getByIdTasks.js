const db = require("../db");


const getByIdTasks = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Realiza la consulta a la base de datos para buscar la tarea por su ID
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tasks WHERE idTask = ?",
        [taskId],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });

    // Verifica si se encontró la tarea
    if (result.length > 0) {
      // Devuelve la tarea encontrada como respuesta JSON
      res.json(result[0]);
    } else {
      // Si no se encontró la tarea, devuelve un mensaje de error
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = getByIdTasks;
