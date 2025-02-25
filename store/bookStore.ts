import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, SortOption } from '../types/book';

interface BookState {
  books: Book[];
  searchQuery: string;
  sortOption: SortOption;
  addBook: (book: Book) => void;
  setBooks: (books: Book[]) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
  loadBooks: () => Promise<void>;
  saveBooks: () => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  updateBook: (book: Book) => Promise<void>;
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  searchQuery: '',
  sortOption: 'date',

  addBook: (book) => {
    set((state) => {
      const newBooks = [...state.books, book];
      return { books: newBooks };
    });
    get().saveBooks();
  },

  setBooks: (books) => set({ books }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),

  loadBooks: async () => {
    try {
      const booksJson = await AsyncStorage.getItem('books');
      if (booksJson) {
        const books = JSON.parse(booksJson);
        set({ books });
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  },

  saveBooks: async () => {
    try {
      const { books } = get();
      await AsyncStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
      console.error('Error saving books:', error);
    }
  },

  deleteBook: async (bookId) => {
    set((state) => ({
      books: state.books.filter((book) => book.id !== bookId),
    }));
    await get().saveBooks();
  },

  updateBook: async (book) => {
    set((state) => ({
      books: state.books.map((b) => (b.id === book.id ? book : b)),
    }));
    await get().saveBooks();
  },
}));