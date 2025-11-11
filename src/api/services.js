import {
  fetchServiceById as fetchMockServiceById,
  fetchServices as fetchMockServices,
} from '../data/mockData';

const API_BASE_URL = '/api';

// Функция для получения всех услуг с фильтрацией
export const getServices = async (filters = {}) => {
  try {
    // Формируем query параметры
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('min_price', filters.minPrice);
    if (filters.maxPrice) params.append('max_price', filters.maxPrice);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/services${queryString ? `?${queryString}` : ''}`;

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
    return await fetchMockServices(filters);
  }
};

// Функция для получения одной услуги по ID
export const getServiceById = async id => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
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
    return await fetchMockServiceById(id);
  }
};
