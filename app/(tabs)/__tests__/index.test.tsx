import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useBookStore } from '../../../store/bookStore';
import BooksScreen from '../index';

// Mock the bookStore
jest.mock('../../../store/bookStore');

const mockedUseBookStore = useBookStore as unknown as jest.Mock;

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockBooks = [
  {
    id: '1',
    name: 'Book A',
    genre: 'עיון',
    rating: 8,
    description: 'Description A',
    date: '2024-02-25',
  },
  {
    id: '2',
    name: 'Book B',
    genre: 'פרוזה',
    rating: 9,
    description: 'Description B',
    date: '2024-02-26',
  },
];

const mockLoadBooks = jest.fn();
const mockSetSearchQuery = jest.fn();
const mockSetSortOption = jest.fn();
const mockDeleteBook = jest.fn();

describe('BooksScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseBookStore.mockReturnValue({
      books: mockBooks,
      searchQuery: '',
      sortOption: 'date',
      setSearchQuery: mockSetSearchQuery,
      setSortOption: mockSetSortOption,
      loadBooks: mockLoadBooks,
      deleteBook: mockDeleteBook,
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<BooksScreen />);
    
    expect(getByText('מה קראתי עכשיו?')).toBeTruthy();
    expect(getByPlaceholderText('חיפוש ספרים...')).toBeTruthy();
    expect(getByText('מיון לפי:')).toBeTruthy();
    expect(getByText('שם')).toBeTruthy();
    expect(getByText('דירוג')).toBeTruthy();
    expect(getByText('תאריך')).toBeTruthy();
  });

  it('loads books on mount', () => {
    render(<BooksScreen />);
    expect(mockLoadBooks).toHaveBeenCalled();
  });

  it('handles search input', () => {
    const { getByPlaceholderText } = render(<BooksScreen />);
    const searchInput = getByPlaceholderText('חיפוש ספרים...');
    
    fireEvent.changeText(searchInput, 'Book');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Book');
  });

  it('handles sort button presses', () => {
    const { getByText } = render(<BooksScreen />);
    
    fireEvent.press(getByText('שם'));
    expect(mockSetSortOption).toHaveBeenCalledWith('name');

    fireEvent.press(getByText('דירוג'));
    expect(mockSetSortOption).toHaveBeenCalledWith('rating');

    fireEvent.press(getByText('תאריך'));
    expect(mockSetSortOption).toHaveBeenCalledWith('date');
  });

  it('renders book cards', () => {
    const { getByText } = render(<BooksScreen />);
    
    expect(getByText('Book A')).toBeTruthy();
    expect(getByText('Book B')).toBeTruthy();
  });

  it('opens add book modal when add button is pressed', () => {
    const { getByTestId } = render(<BooksScreen />);
    const addButton = getByTestId('add-button');
    
    fireEvent.press(addButton);
    // Modal should be visible
    expect(getByTestId('add-book-modal')).toBeTruthy();
  });

  it('opens edit modal with book data when edit is pressed', () => {
    const { getAllByText, getByTestId } = render(<BooksScreen />);
    const editButton = getAllByText('עריכה')[0];
    
    fireEvent.press(editButton);
    // Modal should be visible with book data
    const modal = getByTestId('add-book-modal');
    expect(modal).toBeTruthy();
    expect(getByTestId('book-name-input').props.value).toBe('Book A');
  });

  it('handles book deletion', async () => {
    const { getAllByText } = render(<BooksScreen />);
    const deleteButton = getAllByText('מחיקה')[0];
    
    fireEvent.press(deleteButton);
    // Confirm deletion in alert
    expect(mockDeleteBook).toHaveBeenCalledWith('1');
    expect(mockLoadBooks).toHaveBeenCalled();
  });
}); 