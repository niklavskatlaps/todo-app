import { dataSource } from "..";
import { TodoListEntity } from "../entities/todo-list.entity";

export const todoListRepository = dataSource.getRepository(TodoListEntity);
