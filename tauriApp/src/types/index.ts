// Интерфейс для румба
export interface Rumb {
  id: number;
  direction: string;
  description: string;
  price: number;
  distance: number;
  speed: number;
  image: string | null;
}

// Интерфейс для параметров румба в заявке
export interface RumbParams {
  distance: string;
  speed: string;
}

// Интерфейс для элемента в заявке
export interface FlyRequestItem extends Rumb {
  params: RumbParams;
}

// Интерфейс для фильтров
export interface RumbFilters {
  search: string;
  minPrice: string;
  maxPrice: string;
}

// Интерфейс для элемента breadcrumb
export interface BreadcrumbItem {
  label: string;
  path: string | null;
}
