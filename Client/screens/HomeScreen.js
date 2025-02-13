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
    backgroundColor: '#445058', // Hueso
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#2d3830', // Beige
    marginBottom: 200,
  },
  image: {
    width: 800,
    height: 1200,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 80, // Ajusta la distancia desde la parte inferior
    left: '50%', // Lo posiciona en el centro de la pantalla
    transform: [{ translateX: -75 }], // Mueve el botón hacia la izquierda la mitad de su ancho
    backgroundColor: '#3d5146',
    paddingVertical: 16, // Aumentado para hacerlo más grande
    paddingHorizontal: 32, // Aumentado para hacerlo más ancho
    borderRadius: 30, // Opcional, para mantenerlo redondeado
    elevation: 5, // Mayor sombra en Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },  
  buttonText: {
    color: '#e0e0e0', // Hueso
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;