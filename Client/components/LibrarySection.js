import React from 'react';
import { View, Text, Dimensions , TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../styles/styles';
import LibraryCard from './LibraryCard';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const libraryItems = [
  { id: '1', imageKey: 'bandera', texto: 'Partidos', screen: 'BibliotecaPartidos'},
  { id: '2', imageKey: 'votos', texto: 'Procesos', screen: 'BibliotecaProcesos' },
  { id: '3', imageKey: 'presidente', texto: 'Candidatos', screen: 'BibliotecaCandidatos' },
];

const LibrarySection = () => {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}> 
      <LibraryCard imageKey={item.imageKey} texto={item.texto} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.librarySection}>
      <Text style={styles.sectionTitle}>Biblioteca</Text>
      <Carousel
        data={libraryItems}
        renderItem={renderItem}
        sliderWidth={width * 1.21}
        itemWidth={width * 0.55}
        layout="default"
        contentContainerCustomStyle={{paddingLeft:65}}
      />
    </View>
  );
};

export default LibrarySection;

