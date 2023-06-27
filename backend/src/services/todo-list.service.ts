import { todoListRepository } from "../database/repositories/todo-list.repository";
import { TodoListEntity } from "../database/entities/todo-list.entity";

type TodoListDto = {
  title: string;
}

export class TodoListService {
  async getAllTodoLists(): Promise<TodoListEntity[]> {
    return todoListRepository.find();
  }

  async createTodoList(dto: TodoListDto): Promise<TodoListEntity> {
    const todoList = todoListRepository.create(dto);
    await todoListRepository.save(todoList);

    return todoList;
  }

  async getTodoListById(id: string): Promise<TodoListEntity | null> {
    return todoListRepository.findOne({
      where: { id: +id },
      order: { todos: { id: "ASC" } }
    });
  }
}
