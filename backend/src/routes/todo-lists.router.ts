import express from "express";
import {  todoListsController} from "../controllers/todo-lists.controller";

const todoListsRouter = express.Router();

todoListsRouter.get("/", todoListsController.getTodoLists);
todoListsRouter.post("/", todoListsController.createTodoList);
todoListsRouter.get("/:id", todoListsController.getTodoList);

export { todoListsRouter };
