import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import HeaderWithTitle from "../components/HeaderWithTitle";
import InputField from "../components/InputField";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";

const ChatbotScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const defaultMessage = {
      id: Date.now(),
      text: "Hola Soy ElectiBot, tu asistente virtual relacionado con las elecciones y la política en México. Estoy aquí para ayudarte a conocer a los candidatos, simular tu voto y responder cualquier pregunta que tengas sobre el proceso electoral. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
    };
    setMessages([defaultMessage]);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chatbot/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botMessage = { id: Date.now(), text: data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Error al conectar con el chatbot.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <Header />
      {/* <View style={styles.headerContainer}>
        <HeaderWithTitle
          title="ElectiBot"
          linkText="Volver"
          onLinkPress={() => navigation.goBack()}
        />
      </View> */}

      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                item.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  { color: item.sender === "bot" ? "#fff" : "#fff" },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />
      </View>

      <View style={styles.inputContainer}>
        <InputField
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#999"
          style={styles.inputFieldChat}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
  },
  headerContainer: {
    backgroundColor: "#fff",
    elevation: 1,
    paddingBottom: 30,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  messagesContainer: {
    paddingBottom: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#513dx",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3D5146",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    color:'#fff'
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  inputFieldChat: {
    flex: 1,
    marginRight: 10,    
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d5146",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});

export default ChatbotScreen;
