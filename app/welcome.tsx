import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/emoji1.png')} style={styles.logo} />
        <Text style={styles.title}>QUẢN LÝ CÔNG VIỆC</Text>
        <Text style={styles.subtitle}>Tổ chức và theo dõi công việc của bạn một cách hiệu quả</Text>
      </View>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button, 
            pressed && { opacity: 0.7 },
            !name.trim() && { opacity: 0.5 }
          ]}
          onPress={() => router.replace({ pathname: '/tasks', params: { name: name.trim() || 'Người dùng' } })}
          disabled={!name.trim()}
        >
          <Text style={styles.buttonText}>BẮT ĐẦU →</Text>
        </Pressable>
      </View>
      
      <View style={styles.footer}>
        <Image source={require('../assets/images/emoji2.png')} style={styles.footerImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#1CC8EE',
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    backgroundColor: '#1CC8EE',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 240,
    shadowColor: '#1CC8EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  footerImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
