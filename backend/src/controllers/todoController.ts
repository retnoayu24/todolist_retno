import { Response } from "express";
import {
  createTodo,
  deleteTodo,
  findTodoById,
  findTodosByUserId,
  updateTodo,
} from "../models/todoModel.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export async function getTodos(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    const todos = await findTodosByUserId(userId);

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error("Get todos error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

export async function createTodoHandler(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;
    const { task } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    const todoId = await createTodo(
      userId,
      task
    );

    const todo = await findTodoById(
      todoId,
      userId
    );

    return res.status(201).json({
      success: true,
      message: "Todo berhasil dibuat",
      data: todo,
    });
  } catch (error) {
    console.error("Create todo error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

export async function updateTodoHandler(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;
    const todoId = Number(req.params.id);
    const { task, is_completed } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    const existingTodo = await findTodoById(
      todoId,
      userId
    );

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan",
      });
    }

    await updateTodo(
      todoId,
      userId,
      task ?? existingTodo.task,
      is_completed ?? existingTodo.is_completed
    );

    const updatedTodo = await findTodoById(
      todoId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Todo berhasil diperbarui",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Update todo error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

export async function deleteTodoHandler(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;
    const todoId = Number(req.params.id);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    const existingTodo = await findTodoById(
      todoId,
      userId
    );

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan",
      });
    }

    await deleteTodo(
      todoId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Todo berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete todo error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}