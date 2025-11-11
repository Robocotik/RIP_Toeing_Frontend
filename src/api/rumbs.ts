import {fetchRumbById as fetchMockRumbById, fetchRumbs as fetchMockRumbs} from '../data/mockRumbs';
import {Rumb, RumbFilters} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// Функция для получения всех румбов с фильтрацией
export const getRumbs = async (filters: Partial<RumbFilters> = {}): Promise<Rumb[]> => {
  try {
    // Формируем query параметры для поиска по названию
    const params = new URLSearchParams();
    if (filters.search) params.append('query', filters.search);

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

    const data = await response.json();

    // Преобразуем данные бэкенда в формат фронтенда
    return data.map((item: any) => ({
      id: item.id,
      direction: item.title,
      description: `Полет ${item.title}`,
      price: 15000, // Можно добавить в бэкенд или генерировать
      distance: 100,
      speed: 7,
      image: item.image ? `http://localhost:9000/rumbs/${item.image}` : null,
    }));
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

    const item = await response.json();

    // Преобразуем данные бэкенда в формат фронтенда
    return {
      id: item.id,
      direction: item.title,
      description: `Полет ${item.title}`,
      price: 15000,
      distance: 100,
      speed: 7,
      image: item.image ? `http://localhost:9000/rumbs/${item.image}` : null,
    };
  } catch (error) {
    console.warn('Ошибка при получении данных с бэкенда, используем mock данные:', error);
    // Fallback на mock данные
    return await fetchMockRumbById(id);
  }
};

// Функция для получения румба по названию (title)
export const getRumbByTitle = async (title: string): Promise<Rumb | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rumbs?query=${encodeURIComponent(title)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.length === 0) {
      return undefined;
    }

    const item = data[0]; // Берем первый результат

    return {
      id: item.id,
      direction: item.title,
      description: `Полет ${item.title}`,
      price: 15000,
      distance: 100,
      speed: 7,
      image: item.image ? `http://localhost:9000/rumbs/${item.image}` : null,
    };
  } catch (error) {
    console.warn('Ошибка при поиске румба по названию, используем mock данные:', error);
    // Fallback на mock данные
    const rumbs = await fetchMockRumbs({search: title});
    return rumbs.length > 0 ? rumbs[0] : undefined;
  }
};

// Функция для добавления румба в заявку
export const addRumbToRequest = async (rumbId: number, token?: string): Promise<boolean> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/rumbs/addToRequest/${rumbId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to add rumb to request');
    }

    return true;
  } catch (error) {
    console.warn('Ошибка при добавлении румба в заявку:', error);
    return false;
  }
};

// Функция для получения корзины пользователя
export const getUserFlyRequest = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(`/api/flyRequests/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user fly request');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Ошибка при получении корзины пользователя, используем localStorage:', error);
    // Fallback на localStorage
    return null;
  }
};
