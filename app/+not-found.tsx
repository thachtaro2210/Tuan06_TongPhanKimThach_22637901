import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link, Stack, router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.title}>404</Text>
        </View>
        <Text style={styles.subtitle}>Trang không tồn tại</Text>
        <Text style={styles.description}>Có vẻ như bạn đã nhập sai địa chỉ hoặc trang này đã bị xóa.</Text>
        <Pressable style={styles.button} onPress={() => router.replace('/')}> 
          <Text style={styles.buttonText}>Quay về trang chủ</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#25292e',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 280,
  },
  button: {
    backgroundColor: '#ffb300',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#25292e',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
