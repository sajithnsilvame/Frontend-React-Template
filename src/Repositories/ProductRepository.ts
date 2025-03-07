import { IBaseRepository } from '../Config/BaseRepo/BaseRepository';
import { IHttpClient } from '../Config/Infrastructure/http/IHttpClient';

export interface Product {
  id: number;
  // Add your entity properties here
}

/**
 * By default, this repository enables the IProductRepository interface 
 * by extending IBaseRepository<Product>. 
 * 
 * If it's not necessary, remove this interface 
 * and replace IProductRepository with IBaseRepository<Product> 
 * in the ProductRepository class.
 */

export interface IProductRepository extends IBaseRepository<Product> {
  // Add your custom repository methods here
}

export class ProductRepository implements IProductRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Product[]> {
    return this.httpClient.get<Product[]>(`/product`);
  }

  async getById(id: number): Promise<Product> {
    return this.httpClient.get<Product>(`/product/${id}`);
  }

  async create(item: Partial<Product>): Promise<Product> {
    return this.httpClient.post<Product>(`/product`, item);
  }

  async update(id: number, item: Partial<Product>): Promise<Product> {
    return this.httpClient.put<Product>(`/product/${id}`, item);
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete(`/product/${id}`);
  }
}