// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import HeaderWithTitle from "../components/HeaderWithTitle";
import GradientButton from "../components/GradientButton";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Ingresa el correo y contraseña correctamente");
      return;
    }
    console.log(`${API_URL}/api/user/login`);
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        const { token } = data;
        await AsyncStorage.setItem("userToken", token); // Guardar el token
        navigation.navigate("MainScreen");
      } else {
        Alert.alert("Error", data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error en la conexión");
    }
  };

  return (
    
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderWithTitle
          title="Iniciar Sesión"
          linkText="¿No tienes cuenta? Regístrate"
          onLinkPress={() => navigation.navigate("RegistrationScreen")}
          isLoginScreen={true}  // Nueva prop para indicar que estamos en Login
        />
        <View style={styles.formContainer}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <PasswordField
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            showPasswordErrors={false} // No necesitamos validación en el login
          />
          <GradientButton
            onPress={handleLogin}
            text="Iniciar Sesión"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Center content vertically
    paddingTop: 50,
  },
  formContainer: {
    padding: 20,
    paddingHorizontal: 35,
  },
});

export default LoginScreen;