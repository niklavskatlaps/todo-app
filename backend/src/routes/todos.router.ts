import express from "express";
import { todosController } from "../controllers/todos.controller";

const todosRouter = express.Router();

todosRouter.get("/", todosController.getTodos);
todosRouter.post("/", todosController.createTodo);
todosRouter.get("/:id", todosController.getTodo);
todosRouter.put("/:id", todosController.updateTodo);
todosRouter.delete("/:id", todosController.deleteTodo);

export { todosRouter };
