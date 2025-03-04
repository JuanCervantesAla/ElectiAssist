import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2d3830" barStyle="light-content" />

      {/* Animación Lottie */}
      <LottieView
        source={require('../assets/animationAssets/animationHome.json')} 
        autoPlay
        loop={false} 
        style={styles.animation}
      />

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300, // Ajusta el tamaño de la animación
    height: 400,
  },
  button: {
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: '#3d5146',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
