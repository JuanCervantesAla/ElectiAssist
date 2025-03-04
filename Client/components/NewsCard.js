import React from 'react'
import styles from '../styles/styles'
import { View, Text, Image } from "react-native";

const NewsCard = () => {
  return (
    <View style={styles.newsCard}>
        <Image source={require('../assets/informe.png')} style={styles.newsImage}></Image>
        <Text style={styles.newsTitle}>Ultimas noticias</Text>
        <Text style={styles.newsDescription}>Acerca de temas electorales</Text>
    </View>
  );
};

export default NewsCard
