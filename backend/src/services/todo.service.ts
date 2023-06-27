import { todoRepository } from "../database/repositories/todo.repository";
import { TodoEntity } from "../database/entities/todo.entity";
import { HttpException } from "../exceptions/http.exception";

type TodoDto = {
  title?: string;
  description?: string;
  isDone?: boolean;
}

export class TodoService {
  constructor(private todoListId: string) {}

  async getAllTodos(): Promise<TodoEntity[]> {
    return todoRepository.find({ where: { todoList: { id: +this.todoListId } } });
  }

  async createTodo(dto: TodoDto): Promise<TodoEntity> {
    const todo = todoRepository.create({
      title: dto.title,
      description: dto.description,
      todoList: { id: +this.todoListId }
    });

    return todoRepository.save(todo);
  }

  async getTodoById(id: string): Promise<TodoEntity | null> {
    return todoRepository.findOne({ where: { todoList: { id: +this.todoListId }, id: +id } });
  }

  async updateTodoById(id: string, dto: TodoDto): Promise<void> {
    await this.assertCanBeModified(id);

    await todoRepository.update(
      id,
      { title: dto.title, description: dto.description, isDone: dto.isDone }
    );
  }

  async deleteTodoById(id: string): Promise<void> {
    await this.assertCanBeModified(id);

    await todoRepository.delete(id);
  }

  private async assertCanBeModified(id: string): Promise<void> {
    const isExistent = await todoRepository.exist({ where: { todoList: { id: +this.todoListId }, id: +id } });

    if (!isExistent) {
      throw new HttpException("Not found", 404);
    }
  }
}
