import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'מחיקת ספר',
      'האם אתה בטוח שברצונך למחוק ספר זה?',
      [
        {
          text: 'ביטול',
          style: 'cancel',
        },
        {
          text: 'מחק',
          onPress: () => onDelete(book.id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

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
        <>
          <View style={styles.descriptionHeader}>
            <Text 
              style={styles.description}
              numberOfLines={expanded ? undefined : 1}>
              {book.description}
            </Text>
            <Pressable
              onPress={() => setExpanded(!expanded)}
              style={styles.expandButton}>
              {expanded ? (
                <Ionicons name="chevron-up" size={20} color="#8E8E93" />
              ) : (
                <Ionicons name="chevron-down" size={20} color="#8E8E93" />
              )}
            </Pressable>
          </View>
        </>
      )}

      <View style={styles.actions}>
        <Pressable
          onPress={() => onEdit(book)}
          style={[styles.actionButton, styles.editButton]}>
          <Ionicons name="pencil" size={16} color="#007AFF" />
          <Text style={[styles.actionText, styles.editText]}>עריכה</Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={[styles.actionButton, styles.deleteButton]}>
          <Ionicons name="trash" size={16} color="#FF3B30" />
          <Text style={[styles.actionText, styles.deleteText]}>מחיקה</Text>
        </Pressable>
      </View>
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
    flexDirection: 'row-reverse',
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginRight: 4,
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  metadata: {
    flexDirection: 'row-reverse',
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
    textAlign: 'right',
  },
  descriptionHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    textAlign: 'right',
    marginLeft: 8,
  },
  expandButton: {
    paddingTop: 2,
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  editButton: {
    backgroundColor: '#007AFF15',
  },
  deleteButton: {
    backgroundColor: '#FF3B3015',
  },
  editText: {
    color: '#007AFF',
  },
  deleteText: {
    color: '#FF3B30',
  },
});