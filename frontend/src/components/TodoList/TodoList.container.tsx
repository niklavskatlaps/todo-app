import { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import TodoList from "./TodoList.component";
import {
  Filter,
  FilterSelectElement,
  TodoList as TodoListType
} from "./TodoList.type";
import { EVENTS } from "../../socket";
import { TodoItem } from "../TodoItem/TodoItem.type";

type Props = {
    data: TodoListType;
}

export const FILTERS = {
  ALL: "ALL",
  DONE: "DONE",
  NOT_DONE: "NOT_DONE"
} as const;

export default function TodoListContainer(props: Props) {
  const { data } = props;
  const [todoList, setTodoList] = useState<TodoListType>(data);
  const [filteredTodoList, setFilteredTodoList] = useState<TodoListType>(todoList);
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);

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

  useEffect(() => {
    const filterFunctionsByFilter = {
      [FILTERS.ALL]: () => true,
      [FILTERS.DONE]: (todoItem: TodoItem) => todoItem.isDone,
      [FILTERS.NOT_DONE]: (todoItem: TodoItem) => !todoItem.isDone,
    };
    const filterFunction = filterFunctionsByFilter[filter];
    const filteredTodos = todoList.todos.filter(filterFunction);

    setFilteredTodoList({ ...todoList, todos: filteredTodos });
  }, [todoList, filter]);

  const onFilterChange = (e: ChangeEvent<FilterSelectElement>): void => {
    setFilter(e.target.value);
  };

  const containerProps = {
    filteredTodoList,
    filter
  };

  const containerFunctions = {
    onFilterChange
  };

  return (
    <TodoList
      { ...containerProps }
      { ...containerFunctions }
    />
  );
}
