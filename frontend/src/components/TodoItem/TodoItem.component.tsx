import React from "react";
import { TodoItem } from "./TodoItem.type";

type Props = {
    todoItem: TodoItem;
    updateTodo: (todo: Partial<TodoItem>) => void;

}

export default function TodoItemComponent(props: Props) {
  const { todoItem: { id, title, isDone, }, updateTodo } = props;
  return (
    <label className={ isDone ? "text-decoration-line-through" : "" }>
      <input
        className={ "form-check-input me-2" }
        type="checkbox"
        checked={ isDone }
        onChange={ () => updateTodo({ id, isDone: !isDone }) }
      />
      { title }
    </label>
  );
}
