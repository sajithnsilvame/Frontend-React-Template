import { IBaseRepository } from '../Config/BaseRepo/BaseRepository';
import { IHttpClient } from '../Config/Infrastructure/http/IHttpClient';
import { TODO_ENDPOINTS } from '../API/apiEndpoints';
import { Todo } from '../Types/Todo';



export interface ITodoRepository extends IBaseRepository<Todo> {
  toggleComplete(id: number): Promise<Todo>;
  getCompletedTodos(): Promise<Todo[]>;
}

export class TodoRepository implements ITodoRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Todo[]> {
    return this.httpClient.get<Todo[]>(TODO_ENDPOINTS.GET_ALL);
  }

  async getById(id: number): Promise<Todo> {
    return this.httpClient.get<Todo>(`${TODO_ENDPOINTS.GET_BY_ID}/${id}`);
  }

  async create(item: Partial<Todo>): Promise<Todo> {
    return this.httpClient.post<Todo>(TODO_ENDPOINTS.CREATE, item);
  }

  async update(id: number, item: Partial<Todo>): Promise<Todo> {
    return this.httpClient.put<Todo>(`${TODO_ENDPOINTS.UPDATE}/${id}`, item);
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete(`${TODO_ENDPOINTS.DELETE}/${id}`);
  }

  async toggleComplete(id: number): Promise<Todo> {
    const todo = await this.getById(id);
    return this.update(id, { completed: !todo.completed });
  }

  async getCompletedTodos(): Promise<Todo[]> {
    const todos = await this.getAll();
    return todos.filter(todo => todo.completed);
  }
} 