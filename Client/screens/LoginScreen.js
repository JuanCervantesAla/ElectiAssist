// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      alert("Ingresa el correo y contrasena correctamente");
      return;
    }
    try {
      console.log(`${API_URL}/api/user/login`);
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Inicio de sesion exitoso");
        const { token } = data;
        await AsyncStorage.setItem("userToken", token); // Guardar el token
        navigation.navigate("MainScreen");
      } else {
        alert(data.message || "Error al iniciar sesion");
      }
    } catch (error) {
      console.error(error);
      alert("Error en la conexion");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Botón de retroceso */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="leftcircle" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <LinearGradient
              colors={["#3d5146", "#2d3830"]}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0", // Hueso
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2d3830", // Verde oscuro
  },
  input: {
    height: 50,
    borderColor: "#3d5146", // Verde claro
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff", // Fondo blanco para el input
    color: "#2d3830", // Verde oscuro para el texto
  },
  button: {
    marginTop: 10,
  },
  gradient: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#3d5146", // Verde claro
  },
  buttonText: {
    color: "#e0e0e0", // Hueso
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    textAlign: "center",
    color: "#3d5146", // Verde claro
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3d5146",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  backButtonIcon: {
    color: "#e0e0e0",
    fontSize: 30, // Aumenté el tamaño para mejor visibilidad
  },
});
export default LoginScreen;
