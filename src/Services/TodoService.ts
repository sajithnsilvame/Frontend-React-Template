import { ITodoRepository, Todo } from '../Repositories/TodoRepository';

export interface ITodoService {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: number): Promise<Todo>;
  createTodo(title: string): Promise<Todo>;
  toggleTodoComplete(id: number): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
  getCompletedTodos(): Promise<Todo[]>;
}

export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.getAll();
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.todoRepository.getById(id);
  }

  async createTodo(title: string): Promise<Todo> {
    return this.todoRepository.create({
      title,
      completed: false,
    });
  }

  async toggleTodoComplete(id: number): Promise<Todo> {
    return this.todoRepository.toggleComplete(id);
  }

  async deleteTodo(id: number): Promise<void> {
    return this.todoRepository.delete(id);
  }

  async getCompletedTodos(): Promise<Todo[]> {
    return this.todoRepository.getCompletedTodos();
  }
} 