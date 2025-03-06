import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { API_URL } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false); // If Login is loading
  const [error, setError] = useState(null); // To set a possible error
  const navigation = useNavigation(); // To use Navigation

  const login = async (email, password) => {
    if (!email || !password) {
      Alert.alert("Error", "Ingresa el correo y contraseña correctamente");
      return;
    }

    setIsLoading(true);
    console.log(`${API_URL}/api/user/login`);

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!result || typeof result !== "object") {
        throw new Error("Respuesta inválida del servidor");
      }

      console.log(result);

      if (response.ok) {
        const { token, data } = result; // Extraemos token y data

        if (!token) {
          throw new Error("No se recibió un token en la respuesta del servidor");
        }

        const userId = data?.id ?? null;

        if (userId !== null) {
          await AsyncStorage.setItem("userId", userId.toString());
        }

        await AsyncStorage.setItem("userToken", token);
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        navigation.navigate("MainScreen");
      } else {
        Alert.alert("Error", result.message || "Error al iniciar sesión");
        setError(result.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("Error en login:", err.message);
      Alert.alert("Error", "Error en la conexión con el servidor");
      setError("Error en la conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};

export default useAuth;
