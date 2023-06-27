import { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { z } from "zod";
import { TodoService } from "../services/todo.service";
import { HttpException } from "../exceptions/http.exception";
import { parseRequest } from "../utils/parse-request.util";
import { EVENTS } from "../socket";

type CustomResponse = Response<Record<string, any>, { io: SocketIOServer }>

const BASE_SCHEMA = z.object({
  query: z.object({
    listId: z.string()
  })
});

async function getTodos(req: Request, res: CustomResponse): Promise<void> {
  const { query: { listId } } = parseRequest(BASE_SCHEMA, req);

  const todoService = new TodoService(listId);
  const todos = await todoService.getAllTodos();

  res.json({ data: todos });
}

async function createTodo(req: Request, res: CustomResponse): Promise<void> {
  const schema = BASE_SCHEMA.merge(z.object({
    body: z.object({
      title: z.string().nonempty(),
      description: z.string().optional()
    })
  }));
  const { body: { title, description }, query: { listId } } = parseRequest(schema, req);
  const { locals: { io } } = res;

  const todoService = new TodoService(listId);
  const todo = await todoService.createTodo({ title, description });

  io.to(listId).emit(EVENTS.TODO_CREATED, todo);

  res.status(201).json(todo);
}

async function getTodo(req: Request, res: CustomResponse): Promise<void> {
  const schema = BASE_SCHEMA.merge(z.object({
    params: z.object({
      id: z.string()
    })
  }));
  const { params: { id }, query: { listId } } = parseRequest(schema, req);

  const todoService = new TodoService(listId);
  const todo = await todoService.getTodoById(id);

  if (!todo) {
    throw new HttpException("Not found", 404);
  }

  res.json(todo);
}

async function updateTodo(req: Request, res: CustomResponse): Promise<void> {
  const schema = BASE_SCHEMA.merge(z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      isDone: z.boolean().optional()
    })
  }));
  const { params: { id }, body: { title, description, isDone }, query: { listId } } = parseRequest(schema, req);
  const { locals: { io } } = res;

  const todoService = new TodoService(listId);
  await todoService.updateTodoById(id, { title, description, isDone });

  io.to(listId).emit(EVENTS.TODO_UPDATED, await todoService.getTodoById(id));

  res.status(204).json();
}

async function deleteTodo(req: Request, res: CustomResponse): Promise<void> {
  const schema = BASE_SCHEMA.merge(z.object({
    params: z.object({
      id: z.string()
    })
  }));
  const { params: { id }, query: { listId } } = parseRequest(schema, req);
  const { locals: { io } } = res;

  const todoService = new TodoService(listId);
  await todoService.deleteTodoById(id);

  io.to(listId).emit(EVENTS.TODO_DELETED, +id);

  res.status(204).json();
}

export const todosController = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
};
