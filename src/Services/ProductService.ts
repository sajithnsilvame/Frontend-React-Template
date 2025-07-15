import { ProductRepository } from '../Repositories/ProductRepository';
export interface Product {
id: number;
// Add your entity properties here
}

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
  createProduct(data: Partial<Product>): Promise<Product>;
  updateProduct(id: number, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}

export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.getById(id);
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    return this.productRepository.create(data);
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
}

/**
 * By default, this service enables the IProductService interface.
 * If it's not necessary, remove this interface and replace IProductService 
 * with direct service implementation in ProductService.
 */
