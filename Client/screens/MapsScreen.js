import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

const MapsScreen = () => {
  const route = useRoute();
  const { casillaData } = route.params || {};

  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (casillaData?.address) {
      obtenerCoordenadas(casillaData.address);
    }
  }, [casillaData]);

  const obtenerCoordenadas = async (direccion) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        setRegion({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        console.error("No se encontraron coordenadas.");
      }
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación de la Casilla</Text>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={region} title="Casilla Electoral" />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  map: { width: "100%", height: "80%" },
});

export default MapsScreen;
