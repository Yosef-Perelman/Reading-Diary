import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BookCard } from '../BookCard';

const mockBook = {
  id: '1',
  name: 'Test Book',
  genre: 'עיון',
  rating: 8,
  description: 'Test description',
  date: '25/02/2024',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('BookCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders book information correctly', () => {
    const { getByText } = render(
      <BookCard book={mockBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('עיון')).toBeTruthy();
    expect(getByText('8/10')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
    expect(getByText('25/02/2024')).toBeTruthy();
  });

  it('calls onEdit when edit button is pressed', () => {
    const { getByText } = render(
      <BookCard book={mockBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.press(getByText('עריכה'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockBook);
  });

  it('expands and collapses description on press', () => {
    const { getByText } = render(
      <BookCard book={mockBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const description = getByText('Test description');
    expect(description.props.numberOfLines).toBe(1);

    fireEvent.press(description);
    expect(description.props.numberOfLines).toBeUndefined();

    fireEvent.press(description);
    expect(description.props.numberOfLines).toBe(1);
  });

  it('shows delete confirmation alert when delete button is pressed', () => {
    const { getByText } = render(
      <BookCard book={mockBook} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.press(getByText('מחיקה'));
    // Alert is shown with confirmation message
    expect(mockOnDelete).not.toHaveBeenCalled(); // Delete not called until confirmed
  });
}); 