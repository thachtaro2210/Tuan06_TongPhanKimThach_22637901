import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TodoService, Todo } from '../services/api';

export default function TasksScreen() {
  const { name } = useLocalSearchParams();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load todos từ API
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await TodoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách công việc');
    } finally {
      setLoading(false);
    }
  };

  // Refresh todos
  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  // Xóa todo
  const deleteTodo = async (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa công việc này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await TodoService.deleteTodo(id);
              setTodos(todos.filter(todo => todo.id !== id));
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể xóa công việc');
            }
          },
        },
      ]
    );
  };

  // Chỉnh sửa todo
  const editTodo = (todo: Todo) => {
    router.push({
      pathname: '/add-job',
      params: { 
        id: todo.id, 
        title: todo.title, 
        body: todo.body,
        isEdit: 'true'
      }
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(search.toLowerCase()) ||
    todo.body.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1CC8EE" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

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
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              {item.body && <Text style={styles.taskBody}>{item.body}</Text>}
              {item.createdAt && (
                <Text style={styles.taskDate}>
                  {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </Text>
              )}
            </View>
            <View style={styles.actionButtons}>
              <Pressable style={styles.editBtn} onPress={() => editTodo(item)}>
                <Text style={{ color: '#1CC8EE', fontSize: 18 }}>✏️</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={() => deleteTodo(item.id)}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có công việc nào</Text>
            <Text style={styles.emptySubText}>Thêm công việc mới bằng nút + bên dưới</Text>
          </View>
        }
      />
      <Pressable style={styles.fab} onPress={() => router.push('/add-job')}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
      <Pressable style={styles.aboutButton} onPress={() => router.push('/about')}>
        <Text style={styles.aboutButtonText}>ℹ️</Text>
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
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#1CC8EE',
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  taskBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  },
  deleteBtn: {
    backgroundColor: '#ff4757',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  aboutButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#1CC8EE',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  aboutButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});
