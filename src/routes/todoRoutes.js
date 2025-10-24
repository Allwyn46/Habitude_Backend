import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
  markcomplete,
} from "../controllers/todoController.js";

const router = Router();

//Create Todo
router.post(
  "/create",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  createTodo,
);

//Getall Todo
router.post(
  "/getall",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  getAllTodos,
);

//Update Todo
router.post(
  "/update",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  updateTodo,
);

//Delete Todo
router.post(
  "/delete",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  deleteTodo,
);

//Mark as complete
router.post(
  "/mark-as-complete",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  markcomplete,
);

export default router;
