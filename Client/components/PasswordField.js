import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet,Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PasswordField = ({ value, onChangeText, showPasswordErrors, passwordErrors }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View>
      <Text style={styles.fieldText}>Contraseña</Text>
      <View
        style={[
          styles.passwordContainer,
          showPasswordErrors && Object.values(passwordErrors).includes(false) ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Contraseña"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPressIn={() => setIsPasswordVisible(true)}
          onPressOut={() => setIsPasswordVisible(false)}
        >
          <Icon
            name={isPasswordVisible ? "eye" : "eyeo"}
            size={24}
            color="#3d5146"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#3d5146",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "rgba(211, 195, 182, 0.3)",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: "#2d3830",
  },
  eyeIcon: {
    padding: 10,
  },
  inputError: {
    borderColor: "#513D3D",
  },
});

export default PasswordField;