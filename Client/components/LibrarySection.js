import React from 'react'
import styles from '../styles/styles'
import { View, Text, TouchableOpacity } from "react-native";
import LibraryCard from './LibraryCard';

const LibrarySection = () => {
  return (
    <View style={styles.librarySection}>
        <Text style={styles.sectionTitle}>Biblioteca</Text>
        <View style={styles.libraryCards}>
          <TouchableOpacity style={styles.libraryItem}>
              <LibraryCard imageKey="bandera" texto="Partidos"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryItem}>
              <LibraryCard imageKey="votos" texto="Procesos"/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default LibrarySection
