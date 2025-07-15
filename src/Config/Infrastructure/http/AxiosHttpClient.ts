
import axiosInstance from '../../axios';
import { IHttpClient } from './IHttpClient';

export class AxiosHttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  }

  async delete(url: string): Promise<void> {
    await axiosInstance.delete(url);
  }
} 