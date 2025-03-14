import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import Header from "../components/Header";
import InputField from "../components/InputField";
import GradientButton from "../components/GradientButton";
import ChatButton from "../components/ChatButton";
import LogoCasilla from "../assets/LogoCasilla.png";

const { width } = Dimensions.get("window");

const CasillasScreen = () => {
  const navigation = useNavigation();
  const [entidad, setEntidad] = useState("");
  const [seccion, setSeccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleConsultar = async () => {
    if (!entidad || !seccion) {
      setModalMessage("Por favor selecciona una entidad y una sección electoral.");
      setModalVisible(true);
      return;
    }

    const url = `${API_URL}/api/casilla/${seccion}/${entidad}/BASICA`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);

      setModalMessage(`Tu lugar para votar es en: ${data.address || "No disponible"}`);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      setModalMessage("No se pudo obtener la información.");
      setModalVisible(true);
      console.error("Error en la consulta:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Header />
        <View style={styles.imageBackgroundContainer}>
          <View style={styles.imageContainer}>
            <Image source={LogoCasilla} style={styles.image} />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={entidad} onValueChange={(itemValue) => setEntidad(itemValue)} style={styles.picker}>
              <Picker.Item label="Selecciona una entidad" value="" />
              <Picker.Item label="BAJA CALIFORNIA" value="BAJA CALIFORNIA" />
              <Picker.Item label="JALISCO" value="JALISCO" />
            </Picker>
          </View>
          <InputField
            label="Sección Electoral"
            value={seccion}
            onChangeText={setSeccion}
            placeholder="Ej. 1391"
            keyboardType="numeric"
            style={{ textAlign: "center" }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton onPress={handleConsultar} text={loading ? "Consultando..." : "Consultar"} disabled={loading} />
        </View>
        <ChatButton />

        {/* Modal de mensajes */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 100,
    marginBottom: 60,
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: width * 0.7,
    height: 150,
    resizeMode: "contain",
  },
  formContainer: {
    width: width * 0.9,
    marginTop: 20,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    width: width * 0.9,
    marginTop: -30,
  },
  imageBackgroundContainer: {
    width: width * 0.9,
    backgroundColor: "rgba(61, 81, 70, 0.3)",
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CasillasScreen;
