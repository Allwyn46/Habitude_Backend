import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updatecategory,
} from "../controllers/todoCategoryController.js";

const router = Router();

//Create Category
router.post(
  "/create",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  createCategory,
);

//Getall Category
router.post(
  "/getall",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  getAllCategory,
);

//Update Todo
router.post(
  "/update",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  updatecategory,
);

//Delete Todo
router.post(
  "/delete",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  deleteCategory,
);

export default router;
