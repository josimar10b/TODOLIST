const db = require("../db");


 const updateTasks = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { Title, Description, completed } = req.body;
    
        // Realiza la consulta a la base de datos para actualizar la tarea
        const result = await new Promise((resolve, reject) => {
          db.query(
            "UPDATE tasks SET Title = ?, Description = ?, completed = ? WHERE idTask = ?",
            [Title, Description, completed, taskId],
            (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            }
          );
        });
    
        // Verifica si se actualizó correctamente la tarea
        if (result.affectedRows > 0) {
          // Si se actualizó correctamente, devuelve un mensaje de éxito
          res.json({ message: "Tarea actualizada correctamente" });
        } else {
          // Si no se actualizó ninguna tarea, devuelve un mensaje de error
          res.status(404).json({ message: "Tarea no encontrada o ningún cambio realizado" });
        }
      } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
   }

   module.exports = updateTasks;