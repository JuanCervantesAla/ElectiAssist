import React, { useEffect, useState } from 'react';
import {SafeAreaView, ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/Header';
import { API_URL } from '@env';
import ChatButton from '../components/ChatButton';
import ArticleGrid from '../components/ArticleGrid';

const NewsScreen = () => {

    const [news, setNews] = useState([]);
    
        useEffect(() => {
            fetch(`${API_URL}/api/news`)
                .then((response) => response.json()) 
                .then((data) => {
            console.log("Datos obtenidos:", data);
            setNews(data); 
        })
        .catch((error) => {
            console.error('Error al obtener los partidos:', error);
        });
      }, []);

  return (

    <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor='#fff' />
        <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: '#DCD7D3', paddingBottom: -20, height:840 }]}>
            <Header />
            <ArticleGrid articles={news} />
            <View style={[{marginTop:25}]}>
                <ChatButton />
            </View>
        </ScrollView>
    </SafeAreaView>

  );
};

const stylesPartidos = StyleSheet.create({
    container: {
        marginLeft: 60,
        marginTop: 15,
        width: '70%',
        height: 700,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 50,
        fontFamily: 'AbhayaLibreExtraBold',
        marginLeft: 15,
        marginTop: 15,
        marginBottom:15,
        color: '#3D5146',
        backgroundColor: '#DCD7D3',
    },
});

export default NewsScreen
