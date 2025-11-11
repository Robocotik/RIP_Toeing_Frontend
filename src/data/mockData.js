// Mock данные для услуг
export const mockServices = [
  {
    id: 1,
    direction: 'Север',
    description: 'Полет на север - комфортабельный перелет Boeing-737',
    price: 15000,
    distance: 50,
    speed: 7,
    image: null,
  },
  {
    id: 2,
    direction: 'Юг',
    description: 'Полет на юг - теплые края ждут вас',
    price: 18000,
    distance: 120,
    speed: 8,
    image: null,
  },
  {
    id: 3,
    direction: 'Восток',
    description: 'Полет на восток - навстречу солнцу',
    price: 12000,
    distance: 80,
    speed: 6,
    image: null,
  },
  {
    id: 4,
    direction: 'Запад',
    description: 'Полет на запад - путешествие в европейском стиле',
    price: 22000,
    distance: 150,
    speed: 10,
    image: null,
  },
  {
    id: 5,
    direction: 'Северо-Восток',
    description: 'Полет на северо-восток - экзотические направления',
    price: 16000,
    distance: 90,
    speed: 7,
    image: null,
  },
  {
    id: 6,
    direction: 'Северо-Запад',
    description: 'Полет на северо-запад - скандинавская сказка',
    price: 19000,
    distance: 110,
    speed: 8,
    image: null,
  },
  {
    id: 7,
    direction: 'Юго-Восток',
    description: 'Полет на юго-восток - азиатское приключение',
    price: 25000,
    distance: 200,
    speed: 12,
    image: null,
  },
  {
    id: 8,
    direction: 'Юго-Запад',
    description: 'Полет на юго-запад - средиземноморский рай',
    price: 21000,
    distance: 140,
    speed: 9,
    image: null,
  },
];

// Функция для получения всех услуг
export const fetchServices = async (filters = {}) => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300));

  let services = [...mockServices];

  // Фильтрация по поиску
  if (filters.search) {
    services = services.filter(
      s =>
        s.direction.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  // Фильтрация по минимальной цене
  if (filters.minPrice) {
    services = services.filter(s => s.price >= Number(filters.minPrice));
  }

  // Фильтрация по максимальной цене
  if (filters.maxPrice) {
    services = services.filter(s => s.price <= Number(filters.maxPrice));
  }

  return services;
};

// Функция для получения одной услуги по ID
export const fetchServiceById = async id => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockServices.find(s => s.id === Number(id));
};
