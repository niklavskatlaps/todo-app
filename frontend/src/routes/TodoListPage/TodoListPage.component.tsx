import React from "react";
import Loader from "../../components/Loader";
import TodoList from "../../components/TodoList";
import { TodoList as TodoListType } from "../../components/TodoList/TodoList.type";

type Props = {
    isLoading: boolean;
    todoList?: TodoListType;
}

export default function TodoListPageComponent(props: Props) {
  const { todoList, isLoading } = props;

  if (isLoading || !todoList) {
    return <Loader />;
  }

  return <TodoList data={ todoList } />;
}
