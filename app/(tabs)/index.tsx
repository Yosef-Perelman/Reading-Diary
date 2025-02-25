import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookCard } from '../../components/BookCard';
import { AddBookModal } from '../../components/AddBookModal';
import { useBookStore } from '../../store/bookStore';
import { SortOption } from '../../types/book';

export default function BooksScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { books, searchQuery, sortOption, setSearchQuery, setSortOption, loadBooks } =
    useBookStore();

  useEffect(() => {
    loadBooks();
  }, []);

  const filteredBooks = books
    .filter((book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });

  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>מה קראתי עכשיו?</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש ספרים..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign="right"
        />
        <Ionicons
          name="search"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>מיון לפי:</Text>
        <View style={styles.sortButtons}>
          <Pressable
            style={[
              styles.sortButton,
              sortOption === 'name' && styles.sortButtonActive,
            ]}
            onPress={() => handleSort('name')}>
            <Text
              style={[
                styles.sortButtonText,
                sortOption === 'name' && styles.sortButtonTextActive,
              ]}>
              שם
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.sortButton,
              sortOption === 'rating' && styles.sortButtonActive,
            ]}
            onPress={() => handleSort('rating')}>
            <Text
              style={[
                styles.sortButtonText,
                sortOption === 'rating' && styles.sortButtonTextActive,
              ]}>
              דירוג
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.sortButton,
              sortOption === 'date' && styles.sortButtonActive,
            ]}
            onPress={() => handleSort('date')}>
            <Text
              style={[
                styles.sortButtonText,
                sortOption === 'date' && styles.sortButtonTextActive,
              ]}>
              תאריך
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => <BookCard book={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>

      <AddBookModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 50,
    fontFamily: 'System',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  searchIcon: {
    marginLeft: 8,
  },
  sortContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#8E8E93',
    fontWeight: '500',
  },
  sortButtons: {
    flexDirection: 'row-reverse',
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sortButtonActive: {
    backgroundColor: '#FF9500',
  },
  sortButtonText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
  list: {
    paddingBottom: 80,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});