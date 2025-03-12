import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const NewsCard = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.newsCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={require('../assets/informe.png')} style={styles.newsImage} />
      <Text style={styles.newsTitle}>Últimas noticias</Text>
      <Text style={styles.newsDescription}>Acerca de temas electorales</Text>
    </TouchableOpacity>
  );
};

export default NewsCard;
