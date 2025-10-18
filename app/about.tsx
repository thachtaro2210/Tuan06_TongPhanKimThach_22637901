import { Text, View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function AboutScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giới thiệu</Text>
      <Text style={styles.description}>Ứng dụng này giúp bạn quản lý thông tin cá nhân một cách dễ dàng và hiệu quả. Bạn có thể xem, chỉnh sửa và cập nhật thông tin của mình mọi lúc, mọi nơi.</Text>
      <Pressable style={styles.navButtonBottom} onPress={() => router.replace('/')}> 
        <Text style={styles.navButtonText}>{'<'} Quay lại</Text>
      </Pressable>
    </View>
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
  navButton: {
    marginTop: 32,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
  },
  navButtonBottom: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    alignSelf: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#b0b0b0',
    textAlign: 'center',
    maxWidth: 320,
  },
});
