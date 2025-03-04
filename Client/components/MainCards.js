import React from 'react'
import styles from '../styles/styles'
import { View, TouchableOpacity, Text, Image } from "react-native";


const MainCards = () => {
  return (
    <View style={styles.mainCards}>
        <TouchableOpacity style={styles.card}>
            <Image source={require("../assets/piechart.png")} style={styles.cardIcon}></Image>
            <Text style={styles.cardTitle}>Simulacion de voto</Text>
            <Text style={styles.cardDescription}>Clave de elector requerida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
            <Image source={require("../assets/voting.png")} style={styles.cardIcon}></Image>
            <Text style={styles.cardTitle}>Consulta tu casilla</Text>
            <Text style={styles.cardDescription}>Codigo postal requerido</Text>
        </TouchableOpacity>
    </View>
  );
};

export default MainCards
