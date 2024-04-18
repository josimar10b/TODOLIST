const db = require("../db");

const postTasks = async (req, res) => {
    try {
        const { Title, Description } = req.body;
    
        // Realiza la consulta a la base de datos para insertar la nueva tarea
        const result = await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO tasks (Title, Description, completed) VALUES (?, ?, 0)",
            [Title, Description],
            (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            }
          );
        });
    
        // Verifica si se creó correctamente la nueva tarea
        if (result.affectedRows > 0) {
          // Si se creó correctamente, devuelve un mensaje de éxito
          res.json({ message: "Nueva tarea creada correctamente" });
        } else {
          // Si no se creó ninguna tarea, devuelve un mensaje de error
          res.status(500).json({ message: "Error al crear la nueva tarea" });
        }
      } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
}

module.exports = postTasks;