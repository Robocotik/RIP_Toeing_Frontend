// Интерфейс для румба
export interface Rumb {
  ID: number;
  Title: string;
  Image: string;
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
