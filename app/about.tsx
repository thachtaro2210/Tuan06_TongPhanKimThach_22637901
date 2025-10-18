import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/images/emoji3.png')} style={styles.logo} />
        <Text style={styles.title}>Về Ứng Dụng</Text>
        <Text style={styles.description}>
          Ứng dụng Quản Lý Công Việc giúp bạn tổ chức và theo dõi các nhiệm vụ hàng ngày một cách hiệu quả. 
          Với giao diện thân thiện và dễ sử dụng, bạn có thể dễ dàng thêm, chỉnh sửa và xóa các công việc.
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Tính năng chính:</Text>
          <Text style={styles.featureItem}>• Thêm công việc mới</Text>
          <Text style={styles.featureItem}>• Chỉnh sửa công việc hiện có</Text>
          <Text style={styles.featureItem}>• Xóa công việc không cần thiết</Text>
          <Text style={styles.featureItem}>• Tìm kiếm công việc</Text>
          <Text style={styles.featureItem}>• Đồng bộ dữ liệu với MockAPI</Text>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Thông tin phiên bản</Text>
          <Text style={styles.infoText}>Phiên bản: 1.0.0</Text>
          <Text style={styles.infoText}>Phát triển bởi: Tổng Phan Kim Thách</Text>
          <Text style={styles.infoText}>MSSV: 22637901</Text>
        </View>
      </View>
      
      <Pressable style={styles.navButtonBottom} onPress={() => router.back()}> 
        <Text style={styles.navButtonText}>{'<'} Quay lại</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1CC8EE',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  features: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  info: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  navButtonBottom: {
    backgroundColor: '#1CC8EE',
    margin: 24,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#1CC8EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
