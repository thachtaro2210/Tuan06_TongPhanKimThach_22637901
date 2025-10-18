import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TodoService } from '../services/api';

export default function AddJobScreen() {
  const { id, title, body, isEdit } = useLocalSearchParams();
  const [jobTitle, setJobTitle] = useState('');
  const [jobBody, setJobBody] = useState('');
  const [loading, setLoading] = useState(false);
  const isEditMode = isEdit === 'true';

  useEffect(() => {
    if (isEditMode && title && body) {
      setJobTitle(title as string);
      setJobBody(body as string);
    }
  }, [isEditMode, title, body]);

  const handleSubmit = async () => {
    if (!jobTitle.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề công việc');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && id) {
        await TodoService.updateTodo(id as string, jobTitle.trim(), jobBody.trim());
        Alert.alert('Thành công', 'Công việc đã được cập nhật');
      } else {
        await TodoService.createTodo(jobTitle.trim(), jobBody.trim());
        Alert.alert('Thành công', 'Công việc đã được thêm');
      }
      router.back();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu công việc');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={() => router.back()}>
        <Text style={styles.navButtonText}>{'<'} Quay lại</Text>
      </Pressable>
      <Text style={styles.title}>
        {isEditMode ? 'CHỈNH SỬA CÔNG VIỆC' : 'THÊM CÔNG VIỆC MỚI'}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề công việc"
        placeholderTextColor="#aaa"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Nhập mô tả công việc (tùy chọn)"
        placeholderTextColor="#aaa"
        value={jobBody}
        onChangeText={setJobBody}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      
      <Pressable
        style={({ pressed }) => [
          styles.button, 
          pressed && { opacity: 0.7 },
          loading && { opacity: 0.5 }
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditMode ? 'CẬP NHẬT →' : 'THÊM MỚI →'}
          </Text>
        )}
      </Pressable>
      <Image source={require('../assets/images/emoji4.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#25292e',
    fontWeight: 'bold',
    marginBottom: 32,
    letterSpacing: 1.2,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  textArea: {
    height: 100,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#1CC8EE',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 220,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 16,
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
