// Если прокси не работает, раскомментируйте эту строку:

import type {Rumb} from '../types';

// const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = '/api';
const MINIO_BASE_URL = 'http://localhost:9000';

class ApiService {
  async getRumbs(): Promise<Rumb[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/rumbs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return data.map((rumb: Rumb) => ({
        ...rumb,
        Image: `${MINIO_BASE_URL}/rumbs/${rumb.Image}`,
      }));
    } catch (error) {
      console.error('Error fetching rumbs:', error);
      throw error;
    }
  }

  async getRumbById(id: number): Promise<Rumb> {
    try {
      const response = await fetch(`${API_BASE_URL}/rumbs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return {
        ...data,
        Image: `${MINIO_BASE_URL}/rumbs/${data.Image}`,
      };
    } catch (error) {
      console.error(`Error fetching rumb ${id}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
