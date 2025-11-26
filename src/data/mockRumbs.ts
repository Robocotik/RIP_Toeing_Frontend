import {Rumb, RumbFilters} from '../types';

// Mock данные для румбов
export const mockRumbs: Rumb[] = [
  {
    id: 6,
    direction: 'Северо-Запад',
    description: 'Полет на северо-запад - скандинавская сказка',
    price: 19000,
    distance: 110,
    speed: 8,
    image: '/images/rumbs/arrow-north-west.svg',
  },
  {
    id: 1,
    direction: 'Север',
    description: 'Полет на север - комфортабельный перелет Boeing-737',
    price: 15000,
    distance: 50,
    speed: 7,
    image: '/images/rumbs/arrow-north.svg',
  },
  {
    id: 5,
    direction: 'Северо-Восток',
    description: 'Полет на северо-восток - экзотические направления',
    price: 16000,
    distance: 90,
    speed: 7,
    image: '/images/rumbs/arrow-north-east.svg',
  },
  {
    id: 4,
    direction: 'Запад',
    description: 'Полет на запад - путешествие в европейском стиле',
    price: 22000,
    distance: 150,
    speed: 10,
    image: '/images/rumbs/arrow-west.svg',
  },
  {
    id: 3,
    direction: 'Восток',
    description: 'Полет на восток - навстречу солнцу',
    price: 12000,
    distance: 80,
    speed: 6,
    image: '/images/rumbs/arrow-east.svg',
  },
  {
    id: 8,
    direction: 'Юго-Запад',
    description: 'Полет на юго-запад - средиземноморский рай',
    price: 21000,
    distance: 140,
    speed: 9,
    image: '/images/rumbs/arrow-south-west.svg',
  },
  {
    id: 2,
    direction: 'Юг',
    description: 'Полет на юг - теплые края ждут вас',
    price: 18000,
    distance: 120,
    speed: 8,
    image: '/images/rumbs/arrow-south.svg',
  },
  {
    id: 7,
    direction: 'Юго-Восток',
    description: 'Полет на юго-восток - азиатское приключение',
    price: 25000,
    distance: 200,
    speed: 12,
    image: '/images/rumbs/arrow-south-east.svg',
  },
];

// Функция для получения всех румбов
export const fetchRumbs = async (filters: Partial<RumbFilters> = {}): Promise<Rumb[]> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300));

  let rumbs: Rumb[] = [...mockRumbs];

  // Фильтрация по поиску
  if (filters.search) {
    rumbs = rumbs.filter(
      r =>
        r.direction.toLowerCase().includes(filters.search!.toLowerCase()) ||
        r.description.toLowerCase().includes(filters.search!.toLowerCase()),
    );
  }

  // Фильтрация по минимальной цене
  if (filters.minPrice) {
    rumbs = rumbs.filter(r => r.price >= Number(filters.minPrice));
  }

  // Фильтрация по максимальной цене
  if (filters.maxPrice) {
    rumbs = rumbs.filter(r => r.price <= Number(filters.maxPrice));
  }

  return rumbs;
};

// Функция для получения одного румба по ID
export const fetchRumbById = async (id: string | number): Promise<Rumb | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockRumbs.find(r => r.id === Number(id));
};
