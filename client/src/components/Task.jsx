import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ Title: "", Description: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/tasks", newTask);
      fetchTasks();
      setNewTask({ Title: "", Description: "" });
    } catch (error) {
      console.error("Error al agregar una nueva tarea:", error);
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleEditTask = (index) => {
    if (tasks.length > 0 && index >= 0 && index < tasks.length) {
      const editedTask = tasks[index];
      setSelectedTask(editedTask);
      setEditIndex(index);
    }
  };

  const handleSaveEdit = async (e, index) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:4000/tasks/${tasks[index].idTask}`,
        selectedTask
      );

      const updatedTasks = [...tasks];
      updatedTasks[index] = selectedTask;
      setTasks(updatedTasks);

      setEditIndex(-1);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error al guardar la tarea editada:", error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const taskId = tasks[index].idTask;

      await axios.delete(`http://localhost:4000/tasks/${taskId}`);

      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleTaskStatusChange = async (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;

      await axios.put(
        `http://localhost:4000/tasks/${updatedTasks[index].idTask}`,
        updatedTasks[index]
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  const handleClearFields = () => {
    setNewTask({ Title: "", Description: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Lista de Tareas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <TextField
              name="Title"
              label="Titulo de la tarea"
              variant="outlined"
              fullWidth
              value={newTask.Title}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <TextField
              name="Description"
              label="Descripcion"
              variant="outlined"
              fullWidth
              value={newTask.Description}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "10px" }}
              onClick={handleClearFields}
            >
              Clear
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} style={{ maxHeight: "400px", overflowY: "auto" }}>
          <TableContainer component={Paper}>
            <Table aria-label="tasks table">
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Completado</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {task.Title}
                    </TableCell>
                    <TableCell>{task.Description}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleTaskStatusChange(index)}
                      />
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
                            zIndex: 9999, // Asegura que la tarjeta esté encima de otros elementos
                          }}
                        >
                          <Card
                            sx={{
                              backgroundColor: "#ccc",
                              color: "#fff",
                              maxWidth: 400,
                              width: "100%",
                            }}
                          >
                            <CardContent>
                              <form
                                onSubmit={(e) => handleSaveEdit(e, editIndex)}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <TextField
                                  name="Title"
                                  label="Titulo de la tarea"
                                  variant="outlined"
                                  value={selectedTask ? selectedTask.Title : ""}
                                  onChange={(e) =>
                                    setSelectedTask({
                                      ...selectedTask,
                                      Title: e.target.value,
                                    })
                                  }
                                  style={{ marginBottom: "10px" }}
                                />
                                <TextField
                                  name="Description"
                                  label="Descripcion"
                                  variant="outlined"
                                  fullWidth
                                  value={
                                    selectedTask ? selectedTask.Description : ""
                                  }
                                  onChange={(e) =>
                                    setSelectedTask({
                                      ...selectedTask,
                                      Description: e.target.value,
                                    })
                                  }
                                  InputLabelProps={{
                                    sx: { fontSize: "1.2rem" },
                                  }} // Ajustar el tamaño del label
                                  style={{ marginBottom: "10px" }}
                                />
                                <CardActions
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                      color: "#fff",
                                      backgroundColor: "#1e88e5",
                                      width: "50%",
                                      marginRight: "5px",
                                    }}
                                  >
                                    Actualizar
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setEditIndex(-1)}
                                    sx={{
                                      color: "#fff",
                                      backgroundColor: "#f44336",
                                      width: "50%",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                </CardActions>
                              </form>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditTask(index)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          if (
                            window.confirm(
                              "¿Estás seguro de que quieres eliminar esta tarea?"
                            )
                          ) {
                            handleDeleteTask(index);
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default TodoList;
