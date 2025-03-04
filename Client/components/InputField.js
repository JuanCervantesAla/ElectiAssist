import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = ({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize, secureTextEntry }) => {
  return (
    <View>
      <Text style={styles.fieldText}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#2d3830",
  },
  input: {
    height: 50,
    borderColor: "#3d5146",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "rgba(211, 195, 182, 0.3)",
    color: "#2d3830",
  },
});

export default InputField;