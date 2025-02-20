import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";

export default function Tutorial() {
    const [currentPage, setCurrentPage] = useState(0);
    const navigation = useNavigation(); // Hook para navegar

    const pages = [
        {
            backgroundColor: "#2d3830",
            image: require("../assets/logov2.png"),
            dimensions: { width: 300, height: 300 },
            color: "#d3c3b6",
            title: "ElectiAssist",
            subtitle: "Bienvenido",
        },
        {
            backgroundColor: "#2d3830",
            dimensions: { width: 250, height: 250 },
            color: "#10B981",
            title: "Funcionalidad 1",
            subtitle: "Aquí puedes gestionar tus tareas fácilmente.",
        },
        {
            backgroundColor: "#2d3830",
            dimensions: { width: 250, height: 250 },
            color: "#10B981",
            title: "Funcionalidad 2",
            subtitle: "Personaliza tu experiencia en la configuración.",
        },
    ];

    const goToNextPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleFinish = () => {
        navigation.replace("HomeScreen");
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: pages[currentPage].backgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor={pages[currentPage].backgroundColor} />
            <Image source={pages[currentPage].image} style={[styles.image, pages[currentPage].dimensions]} />
            <Text style={[styles.title, { color: pages[currentPage].color }]}>{pages[currentPage].title}</Text>
            <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>

            {/* Barra de navegación */}
            <View style={styles.bottomBar}>
                {currentPage > 0 && (
                    <TouchableOpacity style={styles.button} onPress={goToPreviousPage}>
                        <Text style={styles.buttonText}>Atrás</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.pageIndicator}>{currentPage + 1}/{pages.length}</Text>
                <TouchableOpacity style={styles.button} onPress={currentPage === pages.length - 1 ? handleFinish : goToNextPage}>
                    <Text style={styles.buttonText}>{currentPage === pages.length - 1 ? "Finalizar" : "Siguiente"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#E2E8F0",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "#3d5146",
    padding: 10,
    borderRadius: 5,
    minWidth: 70,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pageIndicator: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
