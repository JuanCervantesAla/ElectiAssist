import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { API_URL } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]); // Almacena los mensajes
  const [inputText, setInputText] = useState(""); // Almacena el texto del input
  const flatListRef = useRef(null); // Referencia para el FlatList

  // Función para enviar un mensaje al chatbot
  const sendMessage = async () => {
    if (!inputText.trim()) return; // Evita enviar mensajes vacíos

    // Agrega el mensaje del usuario a la lista de mensajes
    const userMessage = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText(""); // Limpia el campo de entrada
    console.log("Mensaje enviado:", inputText);

    try {
      // Envía el mensaje a la API del chatbot
      const response = await fetch(`${API_URL}/api/chatbot/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      // Agrega la respuesta del chatbot a la lista de mensajes
      const botMessage = { id: Date.now(), text: data.response, sender: "bot" }; //data["out-0"]
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Error al conectar con el chatbot.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Efecto para desplazar la lista al final cuando se agregan nuevos mensajes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Lista de mensajes */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={
                item.sender === "user" ? styles.userMessage : styles.botMessage
              }
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />

        {/* Área de entrada de texto */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesContainer: {
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3d5146",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d5146",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatbotScreen;
