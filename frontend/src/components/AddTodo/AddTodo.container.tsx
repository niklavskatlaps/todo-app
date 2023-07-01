import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { TodoItem } from "../TodoItem/TodoItem.type";
import AddTodo from "./AddTodo.component";

type Props = {
    todoListId: number;
}

export default function AddTodoContainer(props: Props) {
  const { todoListId } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void createTodo(todoTitle);
    setTodoTitle("");
  };

  const onTodoTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value);
  };

  const createTodo = async (title: string): Promise<void> => {
    try {
      await axios.post<TodoItem>("/api/todos", { title }, { params: { listId: todoListId } });
    } catch (error) {
      console.log("Error creating todo:", error);
    }
  };

  const containerProps = {
    todoTitle
  };

  const containerFunctions = {
    onFormSubmit,
    onTodoTitleChange,
  };

  return (
    <AddTodo
      { ...containerProps }
      { ...containerFunctions }
    />
  );
}
