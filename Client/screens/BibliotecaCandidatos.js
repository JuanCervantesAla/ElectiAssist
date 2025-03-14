import React from 'react'
import {SafeAreaView, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/Header';
import CandidatesList from '../components/CandidateList';
import ChatButton from '../components/ChatButton';

const BibliotecaCandidatos = () => {
  return (
    <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor='#fff'></StatusBar>
        <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor:'#DCD7D3'}]}>
            <Header/>
            <CandidatesList/>
        </ScrollView>
        <ChatButton/>
    </SafeAreaView>
  );
};

export default BibliotecaCandidatos
