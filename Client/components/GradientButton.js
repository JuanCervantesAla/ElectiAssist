import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <LinearGradient colors={["#3d5146", "#2d3830"]} style={styles.gradient}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
  gradient: {
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#e0e0e0",
    fontWeight: "bold",
  },
});

export default GradientButton;