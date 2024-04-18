const db = require("../db");

const deleteTasks = async (req, res) => {
    try {
        const taskId = req.params.id;
    
        // Realiza la consulta a la base de datos para eliminar la tarea
        const result = await new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM tasks WHERE idTask = ?",
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
    
        // Verifica si se eliminó correctamente la tarea
        if (result.affectedRows > 0) {
          // Si se eliminó correctamente, devuelve un mensaje de éxito
          res.json({ message: "Tarea eliminada correctamente" });
        } else {
          // Si no se eliminó ninguna tarea, devuelve un mensaje de error
          res.status(404).json({ message: "Tarea no encontrada o ningún cambio realizado" });
        }
      } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
}

module.exports = deleteTasks;