import React, { useState , useEffect} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, ScrollView, Button, TouchableHighlight, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import styles from '../styles/styles'
import Header from '../components/Header'
import MainCards from '../components/MainCards'
import NewsCards from '../components/NewsCard'
import LibrarySection from '../components/LibrarySection.js'
import ChatButton from '../components/ChatButton.js'

const MainScreen = () => {  
    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor='#fff'></StatusBar>
            <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor:'#DCD7D3'}]}>
                <Header/>
                <MainCards/>
                <NewsCards/>
                <LibrarySection/>
            </ScrollView>
            <ChatButton/>
        </SafeAreaView>
    );
};

export default MainScreen;