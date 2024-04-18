const { Router } = require("express");
const deleteTasks = require("../controllers/deleteTasks");
const getAllTasks = require("../controllers/getAllTasks");
const getByIdTasks = require("../controllers/getByIdTasks");
const postTasks = require("../controllers/postTasks");
const updateCompletedTask = require("../controllers/updateCompletedTask");
const updateTasks = require("../controllers/updateTasks");

const router = Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id",getByIdTasks);
router.put("/tasks/:id",updateTasks);
router.delete("/tasks/:id", deleteTasks);
router.post("/tasks", postTasks);
router.put("/tasks/:id/completed", updateCompletedTask);

module.exports = router;