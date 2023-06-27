import express from "express";
import { todosRouter } from "./todos.router";
import { todoListsRouter } from "./todo-lists.router";

const apiRouter = express.Router();

apiRouter.use("/todos", todosRouter);
apiRouter.use("/todo-lists", todoListsRouter);

export { apiRouter };
