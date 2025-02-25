export interface Book {
  id: string;
  name: string;
  date: string;
  rating: number;
  genre: string;
  description?: string;
}

export type SortOption = 'name' | 'rating' | 'date';