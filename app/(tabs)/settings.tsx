import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useBookStore } from '../../store/bookStore';

export default function SettingsScreen() {
  const clearBooks = () => {
    useBookStore.setState({ books: [] });
    useBookStore.getState().saveBooks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הגדרות</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ניהול נתונים</Text>
        <Pressable style={styles.dangerButton} onPress={clearBooks}>
          <Text style={styles.dangerButtonText}>מחק את כל הספרים</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>אודות</Text>
        <Text style={styles.aboutText}>
          יומן הספרים שלי
          {'\n'}
          גרסה 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'right',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'right',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    lineHeight: 24,
  },
});