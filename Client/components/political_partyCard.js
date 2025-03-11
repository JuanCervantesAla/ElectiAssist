import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/Header';
import { API_URL } from '@env';
import PoliticalPartyCard from '../components/partyCard';
const BibliotecaCandidatos = () => {
  const [politicalParties, setPoliticalParties] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/political_party`)
      .then((response) => response.json()) 
      .then((data) => {
        console.log("Datos obtenidos:", data);
        setPoliticalParties(data); 
      })
      .catch((error) => {
        console.error('Error al obtener los partidos:', error);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: '#DCD7D3' }]}>
        <View style={stylesPartidos.container}>
          <Text style={[{color:'#fff'}]}>Hello</Text>
          <View style={styles.cardsContainer}>
            {politicalParties.map((party) => (
              <PoliticalPartyCard
                key={party.id}
                title={party.name}
                id={party.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesPartidos = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    minHeight: 900,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom:50,
    gap:15,
    
  },
  title: {
    fontSize: 40,
    fontFamily: 'AbhayaLibreExtraBold',
    marginTop: 15,
    color: '#3D5146',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 10,
  },
});


export default BibliotecaCandidatos;
