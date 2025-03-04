import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native"; // Importa Platform

const HeaderWithTitle = ({ title, linkText, onLinkPress, isLoginScreen }) => {
  return (
    <View style={[styles.headerContainer, isLoginScreen && styles.headerLarge]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#3d5146",
    paddingVertical: Platform.OS === "android" ? 40 : 50, // Más pequeño en Android
    paddingTop: Platform.OS === "android" ? 80 : 100, // Reducir espacio en Android
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? -60 : -80, // Ajustar margen inferior
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    bottom: Platform.OS === "android" ? 50 : 70, // Subir un poco en Android
  },
  headerLarge: {
    paddingVertical: Platform.OS === "android" ? 80 : 100,
    paddingTop: Platform.OS === "android" ? 160 : 200, 
  },
  title: {
    fontSize: Platform.OS === "android" ? 40 : 50, // Texto más pequeño en Android
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  linkText: {
    marginTop: 15,
    color: "#fff",
  },
});

export default HeaderWithTitle;
