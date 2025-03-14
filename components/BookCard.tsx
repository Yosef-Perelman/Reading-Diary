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
            <Pressable 
              onPress={() => setExpanded(!expanded)}
              style={styles.descriptionTextContainer}>
              <Text 
                style={styles.description}
                numberOfLines={expanded ? undefined : 1}>
                {book.description}
              </Text>
            </Pressable>
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
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    color: '#2C2C2C',
    flex: 1,
    marginLeft: 12,
  },
  rating: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#128C7E15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    marginRight: 6,
    fontSize: 14,
    color: '#128C7E',
    fontWeight: '600',
  },
  metadata: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  genre: {
    fontSize: 14,
    color: '#128C7E',
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
  },
  descriptionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    color: '#2C2C2C',
    lineHeight: 20,
    textAlign: 'right',
  },
  expandButton: {
    padding: 4,
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  editButton: {
    backgroundColor: '#128C7E15',
  },
  deleteButton: {
    backgroundColor: '#FF3B3015',
  },
  editText: {
    color: '#128C7E',
  },
  deleteText: {
    color: '#FF3B30',
  },
});