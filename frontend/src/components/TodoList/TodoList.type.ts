import { TodoItem } from "../TodoItem/TodoItem.type";
import { FILTERS } from "./TodoList.container";

export type TodoList = {
    id: number;
    title: string;
    todos: TodoItem[]
}

export type Filter = keyof typeof FILTERS;

export type FilterSelectElement = HTMLSelectElement & { value: Filter };
