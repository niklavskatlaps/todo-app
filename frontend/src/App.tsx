import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import TodoListPage from "./routes/TodoListPage";
import CreateTodoListPage from "./routes/CreateTodoListPage";
import NotFoundPage from "./routes/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <CreateTodoListPage /> } />
        <Route path="/:listId" element={ <TodoListPage /> } />
        <Route path="/notfound" element={ <NotFoundPage /> } />
        <Route path="*" element={ <Navigate to="/notfound" /> } />
      </Routes>
    </BrowserRouter>
  );
}
