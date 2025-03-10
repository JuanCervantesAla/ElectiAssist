import React from 'react'
import {SafeAreaView, ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/Header';
import CardList from '../components/political_partyCard'

const BibliotecaCandidatos = () => {
  return (
    <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor='#fff'></StatusBar>
        <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor:'#DCD7D3'}]}>
            <Header/>
            <View style={stylesPartidos.container}>
                <CardList/>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};


const stylesPartidos = StyleSheet.create({
    container: {
        marginTop:15,
        width: '100%',
        height: 800,
        backgroundColor:'#fff',
        borderRadius:15,
    },
    title: {
        fontSize:40,
        fontFamily: 'AbhayaLibreExtraBold',
        marginLeft:15,
        marginTop:15,
        color:'#3D5146'
    }
});

export default BibliotecaCandidatos
