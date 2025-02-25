import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Book } from '../types/book';
import { useBookStore } from '../store/bookStore';

interface AddBookModalProps {
  visible: boolean;
  onClose: () => void;
  editingBook?: Book | null;
}

export function AddBookModal({ visible, onClose, editingBook }: AddBookModalProps) {
  const addBook = useBookStore((state) => state.addBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const [bookData, setBookData] = useState({
    name: '',
    genre: 'עיון',
    rating: '1',
    description: '',
  });

  useEffect(() => {
    if (editingBook) {
      setBookData({
        name: editingBook.name,
        genre: editingBook.genre,
        rating: editingBook.rating.toString(),
        description: editingBook.description || '',
      });
    } else {
      setBookData({ name: '', genre: 'עיון', rating: '1', description: '' });
    }
  }, [editingBook]);

  const handleSubmit = async () => {
    if (!bookData.name || !bookData.genre || !bookData.rating) {
      return;
    }

    if (editingBook) {
      const updatedBook: Book = {
        ...editingBook,
        name: bookData.name,
        genre: bookData.genre,
        rating: Number(bookData.rating),
        description: bookData.description,
      };
      await updateBook(updatedBook);
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        name: bookData.name,
        genre: bookData.genre,
        rating: Number(bookData.rating),
        description: bookData.description,
        date: new Date().toLocaleDateString('he-IL'),
      };
      addBook(newBook);
    }

    setBookData({ name: '', genre: '', rating: '1', description: '' });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>
              {editingBook ? 'עריכת ספר' : 'הוספת ספר חדש'}
            </Text>

            <Text style={styles.label}>שם הספר</Text>
            <TextInput
              style={styles.input}
              value={bookData.name}
              onChangeText={(text) => setBookData({ ...bookData, name: text })}
              textAlign="right"
            />

            <Text style={styles.label}>ז'אנר</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={bookData.genre}
                onValueChange={(value) => setBookData({ ...bookData, genre: value })}
                style={styles.picker}
                dropdownIconColor="#8E8E93">
                <Picker.Item label="עיון" value="עיון" />
                <Picker.Item label="פרוזה" value="פרוזה" />
                <Picker.Item label="אחר" value="אחר" />
              </Picker>
            </View>

            <Text style={styles.label}>דירוג (1-10)</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={bookData.rating}
                onValueChange={(value) => setBookData({ ...bookData, rating: value })}
                style={styles.picker}
                dropdownIconColor="#8E8E93">
                {[...Array(10)].map((_, i) => (
                  <Picker.Item
                    key={i + 1}
                    label={(i + 1).toString()}
                    value={(i + 1).toString()}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>תיאור (אופציונלי)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bookData.description}
              onChangeText={(text) =>
                setBookData({ ...bookData, description: text })
              }
              multiline
              numberOfLines={4}
              textAlign="right"
              textAlignVertical="top"
            />

            <View style={styles.buttonContainer}>
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {editingBook ? 'שמור שינויים' : 'הוסף ספר'}
                </Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>ביטול</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    direction: 'rtl',
  },
});