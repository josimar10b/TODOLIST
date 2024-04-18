const express = require ("express");
const morgan = require ("morgan");
const taskRoute = require("./routes/taskRoute.js");
const cors = require("cors");
// import { port } from "./config.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(taskRoute);

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to my API" });
// });

// app.use(router);

// // handling errors
// app.use((err, req, res, next) => {
//   return res.status(500).json({
//     status: "error",
//     message: err.message,
//   });
// });

app.listen(4000);
console.log(`Server on port 4000`);