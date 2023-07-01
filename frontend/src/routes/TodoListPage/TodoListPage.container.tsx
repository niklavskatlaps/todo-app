import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import TodoListPage from "./TodoListPage.component";
import { TodoList } from "../../components/TodoList/TodoList.type";

export default function TodoListPageContainer() {
  const { listId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState<TodoList>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoList = async (): Promise<void> => {
      try {
        const { data: todoList } = await axios.get<TodoList>(`/api/todo-lists/${listId}`);
        setTodoList(todoList);
      } catch (err) {
        console.log("Error fetching todo list:", err);
        navigate("/notfound");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTodoList();
  }, [listId, navigate]);

  const containerProps = {
    todoList,
    isLoading,
  };

  return (
    <TodoListPage
      { ...containerProps }
    />
  );
};
