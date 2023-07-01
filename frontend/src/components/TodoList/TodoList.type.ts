import { TodoItem } from "../TodoItem/TodoItem.type";

export type TodoList = {
    id: number;
    title: string;
    todos: TodoItem[]
}
