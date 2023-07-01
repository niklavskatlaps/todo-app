import React, { ChangeEvent, FormEvent } from "react";

type Props = {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onListTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  listTitle: string;
}

export default function CreateTodoListPageComponent(props: Props) {
  const { onListTitleChange, onFormSubmit, listTitle } = props;

  return (
    <form className={ "row g-3 m-0" } onSubmit={ onFormSubmit }>
      <input
        className={ "form-control m-0" }
        type="text"
        placeholder="Enter list title"
        value={ listTitle }
        onChange={ onListTitleChange }
      />
      <button className={ "btn btn-primary" } type="submit" disabled={ !listTitle }>Create a new todo list</button>
    </form>
  );
}
