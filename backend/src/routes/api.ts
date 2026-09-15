import { Router } from "express";
import {
  login,
  register,
} from "../controllers/authController.js";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodos,
  updateTodoHandler,
} from "../controllers/todoController.js";
import { validateRequiredFields } from "../middlewares/validator.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Auth
router.post(
  "/auth/register",
  validateRequiredFields([
    "username",
    "email",
    "password",
  ]),
  register
);

router.post(
  "/auth/login",
  validateRequiredFields([
    "username",
    "password",
  ]),
  login
);

// Todos
router.get(
  "/todos",
  authenticateToken,
  getTodos
);

router.post(
  "/todos",
  authenticateToken,
  validateRequiredFields(["task"]),
  createTodoHandler
);

router.put(
  "/todos/:id",
  authenticateToken,
  validateRequiredFields(["task"]),
  updateTodoHandler
);

router.delete(
  "/todos/:id",
  authenticateToken,
  deleteTodoHandler
);

export default router;