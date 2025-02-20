import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign"; // Importamos el ícono

const BackButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonWrapper, style]}>
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={["#34d399", "#10b981", "#264429"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon name="left" size={20} color="#fff" />
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',  // Usamos posición absoluta
    top: 60,               // Distancia desde el top
    left: 20,              // Distancia desde el left
    zIndex: 10,            // Para asegurarse de que esté encima de otros elementos
  },
  gradientWrapper: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  button: {
    width: "100%", 
    height: "100%", 
    borderRadius: 30,
    alignItems: "center", 
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",
    marginLeft: -4,  // Mueve el ícono 5 unidades a la izquierda|
  },
});

export default BackButton;
