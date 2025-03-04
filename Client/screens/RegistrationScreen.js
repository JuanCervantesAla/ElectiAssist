import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import HeaderWithTitle from "../components/HeaderWithTitle";
import GradientButton from "../components/GradientButton";
import { API_URL } from "@env";

const RegistrationScreen = () => {
  const navigation = useNavigation();

  // Estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("");
  const [age, setAge] = useState("");
  const [curp, setCurp] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 👁 Estado de visibilidad
  const [showPasswordErrors, setShowPasswordErrors] = useState(false); // ⬅️ Se muestran errores solo tras enviar
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
  });

  const handleRegistration = async () => {
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("section", section);
    console.log("age", age);
    console.log("curp", curp);

    // Activamos la visibilidad de los errores de contraseña
    setShowPasswordErrors(true);

    // Si la contraseña es inválida, no enviamos la petición
    if (!isPasswordValid()) {
      Alert.alert("Error", "La contraseña no cumple con los requisitos.");
      return;
    }

    if (!name || !email || !password || !section || !age || !curp) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    console.log(`${API_URL}/api/user/register`);
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
      const data = text ? JSON.parse(text) : {};

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
  // Función para validar la contraseña
  const validatePassword = (text) => {
    setPassword(text);

    const errors = {
      minLength: text.length >= 8,
      upperCase: /[A-Z]/.test(text),
      lowerCase: /[a-z]/.test(text),
      specialChar: /[!@#$%^&*]/.test(text),
    };

    setPasswordErrors(errors);
  };

  // Función para verificar si la contraseña es válida
  const isPasswordValid = () => {
    return Object.values(passwordErrors).every((value) => value === true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderWithTitle
          title="Registrarse"
          linkText="¿Ya tienes cuenta? Inicia Sesión"
          onLinkPress={() => navigation.navigate("LoginScreen")}
        />

        <View style={styles.formContainer}>
          <InputField
            label="Nombre"
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            autoCapitalize="words"
          />
          <InputField
            label="Curp"
            value={curp}
            onChangeText={setCurp}
            placeholder="CURP"
            autoCapitalize="characters"
          />
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
            onChangeText={validatePassword}
            showPasswordErrors={showPasswordErrors}
            passwordErrors={passwordErrors}
          />

          {showPasswordErrors && (
            <View style={styles.validationContainer}>
              <ValidationItem
                text="Debe tener al menos 8 caracteres"
                isValid={passwordErrors.minLength}
              />
              <ValidationItem
                text="Debe contener una letra mayúscula"
                isValid={passwordErrors.upperCase}
              />
              <ValidationItem
                text="Debe contener una letra minúscula"
                isValid={passwordErrors.lowerCase}
              />
              <ValidationItem
                text="Debe incluir un carácter especial (!@#$%^&*)"
                isValid={passwordErrors.specialChar}
              />
            </View>
          )}

<GradientButton
            onPress={handleRegistration}
            text="Crear Cuenta"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// 🔹 Componente para mostrar errores con el icono solo si no se cumple la regla
const ValidationItem = ({ text, isValid }) => {
  return (
    <View style={styles.validationItem}>
      <Image
        source={
          isValid
            ? require("../assets/correctMark.png")
            : require("../assets/errorMark.png")
        }
        style={styles.validationIcon}
      />
      <Text style={[styles.validationText, !isValid && styles.errorText]}>
        {text}
      </Text>
    </View>
  );
};

// Estilos
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
  button: {
    marginTop: 10,
  },
  gradient: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#e0e0e0",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    color: "#fff",
  },
  fieldText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#2d3830",
  },
  inputError: {
    borderColor: "#513D3D", // 🔴 Se pone rojo si hay un error
  },
  errorText: {
    color: "#513D3D",
  },
  validationContainer: {
    marginTop: 5,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  validationText: {
    fontSize: 14,
    color: "#2d3830",
  },
  validationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    marginTop: 3,
  },
});

export default RegistrationScreen;
