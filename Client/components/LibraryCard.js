import React from 'react'
import {View, Text, Image} from 'react-native';
import styles from '../styles/styles';

const images = {
    bandera: require("../assets/bandera.png"),
    votos: require("../assets/votos.png"),
    presidente: require("../assets/amlo.png")
  };

const LibraryCard = ({imageKey, texto}) => {
  return (
    <View style={styles.libraryCard}>
        <Image source={images[imageKey]} style={styles.libraryImage}></Image>
        <View style={[{backgroundColor:'#3D5146', height:'20%', borderBottomLeftRadius:15, borderBottomRightRadius:20}]}>
            <Text style={styles.libraryCardText}>{texto}</Text>
        </View>
    </View>
  );
};

export default LibraryCard
