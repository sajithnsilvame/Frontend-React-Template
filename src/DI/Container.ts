import { AxiosHttpClient } from '../Config/Infrastructure/http/AxiosHttpClient';
//import { TodoRepository } from '../Repositories/TodoRepository';
import { TodoService } from '../Services/TodoService';
import { IHttpClient } from '../Config/Infrastructure/http/IHttpClient';
import { ITodoRepository } from '../Repositories/TodoRepository';
import { ITodoService } from '../Services/TodoService';
import { MockTodoRepository } from '../Repositories/MockTodoRepository';

export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices(): void {
    // Register HTTP Client
    this.services.set('IHttpClient', new AxiosHttpClient());

    // Register Repositories
    // this.services.set(
    //   'ITodoRepository',
    //   new TodoRepository(this.get<IHttpClient>('IHttpClient'))
    // );

    // Register Repositories - Using Mock Repository
    this.services.set('ITodoRepository', new MockTodoRepository());

    // Register Services
    this.services.set(
      'ITodoService',
      new TodoService(this.get<ITodoRepository>('ITodoRepository'))
    );
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found in container`);
    }
    return service as T;
  }
}

// Export convenience methods
export const getHttpClient = (): IHttpClient => Container.getInstance().get('IHttpClient');
export const getTodoService = (): ITodoService => Container.getInstance().get('ITodoService'); 