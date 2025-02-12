import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2d3830" barStyle="light-content" />

      {/* Imagen en el centro */}
      <Image
        source={require('../assets/logoElectiAssist.png')} // Cambia la ruta por la de tu imagen
        style={styles.image}
        resizeMode="contain"
      />
      {/* Título "ElectiAssist" */}
      <Text style={styles.title}>ElectiAssist</Text>

      {/* Botón en la esquina inferior derecha */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón para pasar directo al main, este se debe borrar
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainScreen')}
      >
        <Text style={styles.buttonText}>Ir al Main</Text>
      </TouchableOpacity> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0', // Hueso
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#2d3830', // Beige
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  button: {
    position: 'absolute',
    bottom: 70,
    right: 40,
    backgroundColor: '#3d5146', // Verde claro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#e0e0e0', // Hueso
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;