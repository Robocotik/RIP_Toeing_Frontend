import type {Rumb} from '../types';
import {dest_api, dest_img} from '../../target_config';

const API_BASE_URL = dest_api;
const MINIO_BASE_URL = dest_img;

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
