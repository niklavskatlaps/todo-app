import { Handler } from "express";
import { z } from "zod";
import { TodoListService } from "../services/todo-list.service";
import { parseRequest } from "../utils/parse-request.util";
import { HttpException } from "../exceptions/http.exception";

const getTodoLists: Handler = async (req, res) => {
  const todoListService = new TodoListService();
  const todoLists = await todoListService.getAllTodoLists();

  res.json({ data: todoLists });
};

const createTodoList: Handler = async (req, res) => {
  const schema = z.object({
    body: z.object({
      title: z.string().nonempty()
    })
  });
  const { body: { title } } = parseRequest(schema, req);

  const todoListService = new TodoListService();
  const todoList = await todoListService.createTodoList({ title });

  res.status(201).json(todoList);
};

const getTodoList: Handler = async (req, res) => {
  const schema = z.object({
    params: z.object({
      id: z.string()
    })
  });
  const { params: { id } } = parseRequest(schema, req);

  const todoListService = new TodoListService();
  const todoList = await todoListService.getTodoListById(id);

  if (!todoList) {
    throw new HttpException("Not found", 404);
  }

  res.json(todoList);
};

export const todoListsController = {
  createTodoList,
  getTodoLists,
  getTodoList
};
