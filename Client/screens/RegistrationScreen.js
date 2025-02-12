// src/screens/RegistrationScreen.js
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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("");
  const [age, setAge] = useState("");
  const [curp, setCurp] = useState("");

  const handleRegistration = async () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Section:", section);
    console.log("Age:", age);
    console.log("CURP:", curp);

    // Validación de campos
    if (!name || !email || !password || !section || !age || !curp) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          section,
          age: Number(age),
          curp,
        }),
      });

      const text = await response.text();
      console.log("Raw response:", text); // Para ver si la respuesta tiene contenido
      const data = text ? JSON.parse(text) : {}; // Evita el error de JSON vacío

      if (response.ok) {
        alert("Registro exitoso");
        navigation.navigate("LoginScreen");
      } else {
        alert(data.message || "Error al registrarse");
      }
    } catch (error) {
      console.error(error);
      alert("Error en la conexión");
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
          <Text style={styles.title}>Regístrate</Text>

          {/* Campo: Nombre */}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre completo"
            autoCapitalize="words"
          />

          {/* Campo: Email */}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo: Contraseña */}
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Campo: Sección */}
          <TextInput
            style={styles.input}
            value={section}
            onChangeText={setSection}
            placeholder="Sección"
            autoCapitalize="none"
          />

          {/* Campo: Edad */}
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Edad"
            keyboardType="numeric"
          />

          {/* Campo: CURP */}
          <TextInput
            style={styles.input}
            value={curp}
            onChangeText={setCurp}
            placeholder="CURP"
            autoCapitalize="characters"
          />

          {/* Botón de Registro */}
          <TouchableOpacity onPress={handleRegistration} style={styles.button}>
            <LinearGradient
              colors={["#3d5146", "#2d3830"]}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Crear Cuenta</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Enlace a Login */}
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta? Inicia Sesión
            </Text>
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

export default RegistrationScreen;
