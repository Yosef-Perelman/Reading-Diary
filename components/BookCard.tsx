import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.name}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#FF9500" />
          <Text style={styles.ratingText}>{book.rating}/10</Text>
        </View>
      </View>

      <View style={styles.metadata}>
        <Text style={styles.genre}>{book.genre}</Text>
        <Text style={styles.date}>{book.date}</Text>
      </View>

      {book.description && (
        <Pressable
          onPress={() => setExpanded(!expanded)}
          style={styles.descriptionHeader}>
          <Text style={styles.descriptionTitle}>תיאור</Text>
          {expanded ? (
            <Ionicons name="chevron-up" size={20} color="#8E8E93" />
          ) : (
            <Ionicons name="chevron-down" size={20} color="#8E8E93" />
          )}
        </Pressable>
      )}

      {expanded && book.description && (
        <Text style={styles.description}>{book.description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    color: '#000000',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  genre: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'right',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    textAlign: 'right',
  },
});