import { dataSource } from "..";
import { TodoEntity } from "../entities/todo.entity";

export const todoRepository = dataSource.getRepository(TodoEntity);
