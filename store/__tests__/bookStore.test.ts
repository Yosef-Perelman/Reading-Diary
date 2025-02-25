import { useBookStore } from '../bookStore';

describe('bookStore', () => {
  beforeEach(() => {
    const store = useBookStore.getState();
    store.books = [];
    store.searchQuery = '';
    store.sortOption = 'date';
  });

  it('adds a book correctly', () => {
    const store = useBookStore.getState();
    const newBook = {
      id: '1',
      name: 'Test Book',
      genre: 'עיון',
      rating: 8,
      description: 'Test description',
      date: '25/02/2024',
    };

    store.addBook(newBook);
    expect(store.books).toHaveLength(1);
    expect(store.books[0]).toEqual(newBook);
  });

  it('updates a book correctly', () => {
    const store = useBookStore.getState();
    const book = {
      id: '1',
      name: 'Original Book',
      genre: 'עיון',
      rating: 5,
      description: 'Original description',
      date: '25/02/2024',
    };

    store.addBook(book);
    const updatedBook = { ...book, name: 'Updated Book', rating: 8 };
    store.updateBook(updatedBook);

    expect(store.books).toHaveLength(1);
    expect(store.books[0]).toEqual(updatedBook);
  });

  it('deletes a book correctly', () => {
    const store = useBookStore.getState();
    const book = {
      id: '1',
      name: 'Test Book',
      genre: 'עיון',
      rating: 5,
      description: 'Test description',
      date: '25/02/2024',
    };

    store.addBook(book);
    expect(store.books).toHaveLength(1);

    store.deleteBook(book.id);
    expect(store.books).toHaveLength(0);
  });

  it('filters books by search query', () => {
    const store = useBookStore.getState();
    const books = [
      {
        id: '1',
        name: 'First Book',
        genre: 'עיון',
        rating: 5,
        description: 'Description 1',
        date: '25/02/2024',
      },
      {
        id: '2',
        name: 'Second Book',
        genre: 'פרוזה',
        rating: 8,
        description: 'Description 2',
        date: '25/02/2024',
      },
    ];

    books.forEach(book => store.addBook(book));
    store.setSearchQuery('First');

    const filteredBooks = store.books.filter(book =>
      book.name.toLowerCase().includes(store.searchQuery.toLowerCase())
    );
    expect(filteredBooks).toHaveLength(1);
    expect(filteredBooks[0].name).toBe('First Book');
  });

  it('sorts books correctly', () => {
    const store = useBookStore.getState();
    const books = [
      {
        id: '1',
        name: 'B Book',
        genre: 'עיון',
        rating: 5,
        description: 'Description 1',
        date: '24/02/2024',
      },
      {
        id: '2',
        name: 'A Book',
        genre: 'פרוזה',
        rating: 8,
        description: 'Description 2',
        date: '25/02/2024',
      },
    ];

    books.forEach(book => store.addBook(book));

    // Test name sorting
    store.setSortOption('name');
    expect(store.books[0].name).toBe('A Book');

    // Test rating sorting
    store.setSortOption('rating');
    expect(store.books[0].rating).toBe(8);

    // Test date sorting
    store.setSortOption('date');
    expect(store.books[0].date).toBe('25/02/2024');
  });
}); 