import React, { useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderWithTitle from "../components/HeaderWithTitle";
import GradientButton from "../components/GradientButton";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import useAuth from "../hooks/useAuth"; // Importamos el hook

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth(); // Usamos el hook aquí

  const handleLogin = () => {
    console.log(email);
    console.log(password);//NO BORRAR ESTOS CONSOLE
    login(email, password); // Llamamos al login del hook
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderWithTitle
          title="Iniciar Sesión"
          linkText="¿No tienes cuenta? Regístrate"
          onLinkPress={() => navigation.navigate("RegistrationScreen")}
          isLoginScreen={true}
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
            showPasswordErrors={false}
          />
          <GradientButton
            onPress={handleLogin}
            text={isLoading ? "Cargando..." : "Iniciar Sesión"}
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
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  formContainer: {
    padding: 20,
    paddingHorizontal: 35,
  },
});

export default LoginScreen;
