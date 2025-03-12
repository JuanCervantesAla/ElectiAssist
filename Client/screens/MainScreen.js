import React, { useState , useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/styles'
import { useNavigation } from "@react-navigation/native";
import Header from '../components/Header'
import MainCards from '../components/MainCards'
import NewsCards from '../components/NewsCard'
import LibrarySection from '../components/LibrarySection.js'
import ChatButton from '../components/ChatButton.js'


const MainScreen = () => { 
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor='#fff'></StatusBar>
            <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor:'#DCD7D3'}]}>
                <Header/>
                <MainCards/>
                <NewsCards onPress={() => navigation.navigate("NewsScreen")}/>
                <LibrarySection/>
                <ChatButton/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainScreen;