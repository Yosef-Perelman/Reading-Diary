import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddBookModal } from '../AddBookModal';
import { useBookStore } from '../../store/bookStore';

// Mock the bookStore
jest.mock('../../store/bookStore', () => ({
  useBookStore: jest.fn(),
}));

const mockAddBook = jest.fn();
const mockUpdateBook = jest.fn();
const mockOnClose = jest.fn();

describe('AddBookModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBookStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        addBook: mockAddBook,
        updateBook: mockUpdateBook,
      };
      return selector(store);
    });
  });

  it('renders add book form correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddBookModal visible={true} onClose={mockOnClose} />
    );

    expect(getByText('הוספת ספר חדש')).toBeTruthy();
    expect(getByText('שם הספר')).toBeTruthy();
    expect(getByText("ז'אנר")).toBeTruthy();
    expect(getByText('דירוג (1-10)')).toBeTruthy();
    expect(getByText('תיאור (אופציונלי)')).toBeTruthy();
  });

  it('handles book addition correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddBookModal visible={true} onClose={mockOnClose} />
    );

    // Fill in the form
    fireEvent.changeText(getByPlaceholderText('שם הספר'), 'Test Book');

    // Submit the form
    fireEvent.press(getByText('הוסף ספר'));

    expect(mockAddBook).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Book',
        genre: 'עיון',
        rating: 1,
      })
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles book editing correctly', () => {
    const mockBook = {
      id: '1',
      name: 'Original Book',
      genre: 'עיון',
      rating: 5,
      description: 'Original description',
      date: '25/02/2024',
    };

    const { getByText, getByDisplayValue } = render(
      <AddBookModal visible={true} onClose={mockOnClose} editingBook={mockBook} />
    );

    expect(getByText('עריכת ספר')).toBeTruthy();
    expect(getByDisplayValue('Original Book')).toBeTruthy();

    // Edit the book
    fireEvent.changeText(getByDisplayValue('Original Book'), 'Updated Book');
    fireEvent.press(getByText('שמור שינויים'));

    expect(mockUpdateBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        name: 'Updated Book',
      })
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes modal when cancel button is pressed', () => {
    const { getByText } = render(
      <AddBookModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.press(getByText('ביטול'));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 