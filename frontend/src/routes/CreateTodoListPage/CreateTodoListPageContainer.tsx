import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateTodoListPage from "./CreateTodoListPage.component";
import { TodoList } from "../../components/TodoList/TodoList.type";

export default function CreateTodoListPageContainer() {
  const [listTitle, setListTitle] = useState("");
  const navigate = useNavigate();

  const createTodoList = async (listTitle: string): Promise<void> => {
    try {
      const { data: { id: newListId } } = await axios.post<TodoList>("/api/todo-lists", { title: listTitle });
      navigate(`/${newListId}`);
    } catch (error) {
      console.log("Error creating list:", error);
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void createTodoList(listTitle);
  };

  const onListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
  };

  const containerProps = {
    listTitle
  };

  const containerFunctions = {
    onFormSubmit,
    onListTitleChange
  };

  return (
    <CreateTodoListPage
      { ...containerProps }
      { ...containerFunctions }
    />
  );
};
