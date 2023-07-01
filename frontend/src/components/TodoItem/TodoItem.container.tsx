import axios from "axios";
import TodoItem from "./TodoItem.component";
import { TodoItem as TodoItemType } from "./TodoItem.type";

type Props = {
    todoItem: TodoItemType;
    todoListId: number;
}

export default function TodoItemContainer(props: Props) {
  const { todoItem, todoListId } = props;

  const updateTodo = async (todo: Partial<TodoItemType>): Promise<void> => {
    try {
      await axios.put<TodoItemType>(`/api/todos/${todo.id}`, todo, { params: { listId: todoListId } });
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const containerProps = {
    todoItem,
  };

  const containerFunctions = {
    updateTodo
  };

  return (
    <TodoItem
      { ...containerProps }
      { ...containerFunctions }
    />
  );
}
