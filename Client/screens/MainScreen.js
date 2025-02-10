import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import ImageProfile from '../assets/PP.png';
import { SearchBar } from 'react-native-elements';

const MainScreen = () => {
    // Estado para la búsqueda
    const [search, setSearch] = useState('');
  
    // Navegación
    const navigation = useNavigation();
  
    // Cargar fuentes personalizadas
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold,
    });
  
    // Función para actualizar la búsqueda
    const updateSearch = (text) => {
      setSearch(text);
    };
  
    // Si las fuentes no están cargadas, muestra un mensaje de carga
    if (!fontsLoaded) {
      return <Text>Loading...</Text>;
    }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

        <View style= {styles.verticalView}>{/*Perfil y atras*/}
            <View style = {styles.horizontalView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('LoginScreen')}
                    > 
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Image source={ImageProfile} style={styles.profilePic}/>
            </View>
        </View>

        <View style={styles.verticalView}>{/*Titulo*/}
            <Text style = {styles.title}>Menu de Inicio</Text>
        </View>

        <View style={styles.verticalView}>
            <SearchBar
                placeholder="Escribe aqui..."
                onChangeText={updateSearch}
                value={search}
                platform="default" // Puedes usar "ios" o "android" para estilos específicos
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
            />
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
        backgroundColor: '#e0e0e0',
        
    },
    verticalView:{
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontFamily: 'Montserrat_700Bold',
        fontWeight: 'bold',
    },
    button: {
        height: '50%',
        width: '30%',
        marginTop: '5%',
        backgroundColor: '#3d5146', // Verde claro
        paddingBottom: 0,
        paddingVertical: 7,
        paddingHorizontal: 35,
        borderRadius: 25,
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#e0e0e0', // Hueso
        fontSize: 16,
        fontWeight: 'bold',
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    profilePic: {
        width: '20%',
        height: undefined,
        aspectRatio: 1,
    },
    searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    },
    searchBarInputContainer: {
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    searchBarInput: {
        fontFamily: 'Montserrat_700Bold', // Aplica la fuente personalizada
    },
});

export default MainScreen;
