import TodoList from "./TodoList.component";
import { TodoList as TodoListType } from "./TodoList.type";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { EVENTS } from "../../socket";
import { TodoItem } from "../TodoItem/TodoItem.type";

type Props = {
    data: TodoListType;
}

export default function TodoListContainer(props: Props) {
  const { data } = props;
  const [todoList, setTodoList] = useState<TodoListType>(data);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}?todoListId=${todoList.id}`, { transports: ["websocket"] });

    socket.on(EVENTS.TODO_CREATED, (newTodo: TodoItem) => {
      setTodoList((prevTodoList) => ({ ...prevTodoList, todos: [...prevTodoList.todos, newTodo] }));
    });
    socket.on(EVENTS.TODO_UPDATED, (updatedTodo: TodoItem) => {
      setTodoList((prevTodoList) => ({ ...prevTodoList, todos: prevTodoList.todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo) }));
    });
    socket.on(EVENTS.TODO_DELETED, (deletedTodoId: number) => {
      setTodoList((prevTodoList) => ({ ...prevTodoList, todos: prevTodoList.todos.filter(({ id }) => id !== deletedTodoId) }));
    });

    return () => {
      socket.disconnect();
    };
  }, [todoList.id]);

  const containerProps = {
    todoList,
  };

  return (
    <TodoList
      { ...containerProps }
    />
  );
}
