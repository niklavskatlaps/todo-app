import React, { ChangeEvent } from "react";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";
import { Filter, FilterSelectElement, TodoList } from "./TodoList.type";
import { FILTERS } from "./TodoList.container";

type Props = {
    filteredTodoList: TodoList;
    filter: Filter;
    onFilterChange: (e: ChangeEvent<FilterSelectElement>) => void;
}

export default function TodoListComponent(props: Props) {
  const { filteredTodoList: { id, title, todos }, filter, onFilterChange  } = props;

  return (
    <>
      <div className={ "row" }>
        <span className={ "col h1 m-0" }>{ title }</span>
        <div className={ "col col-md-3 col-lg-3" }>
          <select
            className={ "form-select" }
            id="filter"
            value={ filter }
            onChange={ onFilterChange }
          >
            <option value={ FILTERS.ALL }>All</option>
            <option value={ FILTERS.DONE }>Done</option>
            <option value={ FILTERS.NOT_DONE }>To do</option>
          </select>
        </div>
      </div>
      <AddTodo todoListId={ id } />
      <ul className={ "list-group rounded-0 list-group-vertical mt-3" }>
        { todos.map((todoItem) =>
          <li className={ "list-group-item border-0 p-0 pb-2" } key={ todoItem.id }>
            <TodoItem todoItem={ todoItem } todoListId={ id } />
          </li>)
        }
      </ul>
    </>
  );
}
