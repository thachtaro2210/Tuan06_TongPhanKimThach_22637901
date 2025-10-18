import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AddJobScreen() {
  const [job, setJob] = useState('');
  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={() => router.back()}>
        <Text style={styles.navButtonText}>{'<'} Quay lại</Text>
      </Pressable>
      <Text style={styles.title}>ADD YOUR JOB</Text>
      <TextInput
        style={styles.input}
        placeholder="input your job"
        placeholderTextColor="#aaa"
        value={job}
        onChangeText={setJob}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        onPress={() => {
          // TODO: Add job logic, then navigate back
          router.back();
        }}
      >
        <Text style={styles.buttonText}>FINISH →</Text>
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
    marginBottom: 32,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#222',
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
