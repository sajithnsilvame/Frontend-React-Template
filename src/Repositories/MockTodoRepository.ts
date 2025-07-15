import { Todo } from '../Types/Todo';
import { ITodoRepository } from './TodoRepository';

export class MockTodoRepository implements ITodoRepository {
  private todos: Todo[] = [
    { id: 1, title: 'Learn React', completed: true },
    { id: 2, title: 'Learn TypeScript', completed: false },
    { id: 3, title: 'Build an app', completed: false },
  ];

  async getAll(): Promise<Todo[]> {
    return Promise.resolve([...this.todos]);
  }

  async getById(id: number): Promise<Todo> {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    return Promise.resolve({ ...todo });
  }

  async create(item: Partial<Todo>): Promise<Todo> {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: item.title || '',
      completed: item.completed || false,
    };
    this.todos.push(newTodo);
    return Promise.resolve({ ...newTodo });
  }

  async update(id: number, item: Partial<Todo>): Promise<Todo> {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Todo not found');
    
    this.todos[index] = { ...this.todos[index], ...item };
    return Promise.resolve({ ...this.todos[index] });
  }

  async delete(id: number): Promise<void> {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    return Promise.resolve();
  }

  async toggleComplete(id: number): Promise<Todo> {
    const todo = await this.getById(id);
    return this.update(id, { completed: !todo.completed });
  }

  async getCompletedTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todos.filter(todo => todo.completed));
  }
} 