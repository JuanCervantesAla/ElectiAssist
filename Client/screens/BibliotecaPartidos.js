import React from 'react'
import {SafeAreaView, ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/Header';
import CardList from '../components/political_partyCard'
import ChatButton from '../components/ChatButton';

const BibliotecaCandidatos = () => {
    return (
      <SafeAreaView>
          <StatusBar barStyle="dark-content" backgroundColor='#fff' />
          <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: '#DCD7D3', paddingBottom: -10 }]}>
              <Header />
              <Text style={stylesPartidos.title}>Partidos</Text>
              <View style={stylesPartidos.container}>
                    <CardList />
              </View>
  
              <View style={{ height: 35 }} />
  
              <ChatButton />
          </ScrollView>
      </SafeAreaView>
    );
  };
  
  const stylesPartidos = StyleSheet.create({
      container: {
          marginLeft: 60,
          marginTop: 15,
          width: '70%',
          height: 550,
          backgroundColor: '#fff',
          borderRadius: 15,
          borderBottomRightRadius: 15,
          marginBottom: 10,
      },
      title: {
          fontSize: 40,
          fontFamily: 'AbhayaLibreExtraBold',
          marginLeft: 120,
          marginTop: 15,
          color: '#3D5146',
          backgroundColor: '#DCD7D3',
      },
  });
  
  export default BibliotecaCandidatos;

