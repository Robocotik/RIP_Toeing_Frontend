import {fetchRumbById as fetchMockRumbById, fetchRumbs as fetchMockRumbs} from '../data/mockRumbs';
import {Rumb, RumbFilters} from '../types';

const API_BASE_URL = '/api';

// Функция для получения всех румбов с фильтрацией
export const getRumbs = async (filters: Partial<RumbFilters> = {}): Promise<Rumb[]> => {
  try {
    // Формируем query параметры
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('min_price', filters.minPrice);
    if (filters.maxPrice) params.append('max_price', filters.maxPrice);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/rumbs${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.warn('Ошибка при получении данных с бэкенда, используем mock данные:', error);
    // Fallback на mock данные
    return await fetchMockRumbs(filters);
  }
};

// Функция для получения одного румба по ID
export const getRumbById = async (id: string | number): Promise<Rumb | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rumbs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.warn('Ошибка при получении данных с бэкенда, используем mock данные:', error);
    // Fallback на mock данные
    return await fetchMockRumbById(id);
  }
};
