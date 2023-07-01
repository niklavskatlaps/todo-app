import React, { ChangeEvent, FormEvent } from "react";

type Props = {
    todoTitle: string;
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onTodoTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddTodoComponent(props: Props) {
  const { todoTitle, onFormSubmit, onTodoTitleChange } = props;

  return (
    <form className={ "row g-3 m-0" } onSubmit={ onFormSubmit }>
      <input className={ "form-control" } type="text" placeholder="Enter a new todo item" value={ todoTitle } onChange={ onTodoTitleChange } />
      <button className={ "btn btn-primary" } type="submit" disabled={ !todoTitle }>Add item</button>
    </form>
  );
}
