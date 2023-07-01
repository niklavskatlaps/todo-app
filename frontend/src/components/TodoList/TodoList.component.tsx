import React from "react";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";
import { TodoList } from "./TodoList.type";

type Props = {
    todoList: TodoList
}

export default function TodoListComponent(props: Props) {
  const { todoList: { id, title, todos } } = props;

  return (
    <div>
      <span className={ "row h1 m-0" }>{ title }</span>
      <AddTodo todoListId={ id } />
      <ul className={ "list-group rounded-0 list-group-vertical mt-3" }>
        { todos.map((todoItem) =>
          <li className={ "list-group-item border-0 p-0 pb-2" } key={ todoItem.id }>
            <TodoItem todoItem={ todoItem } todoListId={ id } />
          </li>)
        }
      </ul>
    </div>
  );
}
