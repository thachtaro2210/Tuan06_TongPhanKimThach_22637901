import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const initialTasks = [
  { id: '1', text: 'To check email', done: true },
  { id: '2', text: 'UI task web page', done: false },
  { id: '3', text: 'Learn javascript basic', done: false },
  { id: '4', text: 'Learn HTML Advance', done: false },
  { id: '5', text: 'Medical App UI', done: false },
  { id: '6', text: 'Learn Java', done: false },
];

export default function TasksScreen() {
  const { name } = useLocalSearchParams();
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={() => router.back()}>
        <Text style={styles.navButtonText}>{'<'} Quay lại</Text>
      </Pressable>
      <View style={styles.headerRow}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatar} />
        <View>
          <Text style={styles.hiText}>Hi {name || 'Twinkle'}</Text>
          <Text style={styles.subText}>Have a grate day a head</Text>
        </View>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={[styles.checkBox, item.done && styles.checked]} />
            <Text style={styles.taskText}>{item.text}</Text>
            <Pressable style={styles.editBtn} onPress={() => {}}>
              <Text style={{ color: '#E57373', fontSize: 18 }}>✏️</Text>
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={() => setTasks(tasks.filter(t => t.id !== item.id))}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>—</Text>
            </Pressable>
          </View>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <Pressable style={styles.fab} onPress={() => router.push('/add-job')}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 24,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  hiText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  subText: {
    fontSize: 13,
    color: '#888',
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1CC8EE',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#1CC8EE',
    borderColor: '#1CC8EE',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  editBtn: {
    marginHorizontal: 8,
  },
  deleteBtn: {
    backgroundColor: '#E57373',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    backgroundColor: '#1CC8EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -2,
  },
  navButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
