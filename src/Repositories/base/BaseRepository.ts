import axiosInstance from '../../Config/axios';
import { AxiosError } from 'axios';

export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string | number): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(id: string | number, item: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    try {
      const response = await axiosInstance.get<T[]>(this.endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(id: string | number): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(this.endpoint, item);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(id: string | number, item: Partial<T>): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, item);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await axiosInstance.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      return new Error(error.response?.data?.message || error.message);
    }
    return error instanceof Error ? error : new Error('An unknown error occurred');
  }
} 