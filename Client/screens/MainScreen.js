import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import ImageProfile from '../assets/PP.png';
import { SearchBar } from 'react-native-elements';
import Profile from '../assets/profile.png';
import Home from '../assets/home.png';
import Search from '../assets/search.png';
import Message from '../assets/message.png';
import MenuOpciones from '../components/menu'
import Slider from '../components/Slider'
import Tribunal from '../assets/tribunal.jpg'
import Casilla from '../assets/casillas.png'
import Candidato from '../assets/candidatos.jpg'


const MainScreen = () => {
    // Estado para la búsqueda
    const [search, setSearch] = useState('');
    const [pressedButtonIndex, setPressedButtonIndex] = useState(null); // Estado para el botón presionado

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

    // Función para manejar el botón presionado
    const handlePress = (index) => {
        setPressedButtonIndex(pressedButtonIndex === index ? null : index);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <View style={styles.verticalView}>{/*Perfil y atras*/}
                <View style={styles.horizontalView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <Image source={ImageProfile} style={styles.profilePic} />
                </View>
            </View>

            <View style={styles.verticalView}>{/*Titulo*/}
                <Text style={styles.title}>Menu de Inicio</Text>
            </View>

            <View style={styles.verticalView}>
                <SearchBar
                    placeholder="Escribe aquí..."
                    onChangeText={(text) => updateSearch(text)}
                    value={search}
                    platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    inputContainerStyle={{ backgroundColor: '#fff', borderRadius: 25 }}
                />

            </View>

            <View style={styles.verticalView}>
                <View style={styles.horizontalViewButton}>
                    {["Candidato", "Casilla", "Proceso"].map((text, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(index)}
                            style={pressedButtonIndex === index ? styles.buttonSelectPressed : styles.buttonSelect}
                        >
                            <Text style={pressedButtonIndex === index ? styles.buttonSelectTextPressed : styles.buttonSelectText}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>


            <View style={[styles.verticalView, styles.centered]}>
                <Image source={Candidato} style={styles.frontImage} />
            </View> 


            <View style={styles.verticalView}>
                <MenuOpciones
                    icons={[Home, Search, Message, Profile]} 
                    iconStyle={{ width: 30, height: 30 }} 
                    containerStyle={{ marginTop: 20 }}
                    screens={['ChatbotScreen','ChatbotScreen','ChatbotScreen','ChatbotScreen']} 
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e0e0e0',
    },
    verticalView: {
        marginBottom: 20,
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalViewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor: '#3d5146',
        paddingBottom: 0,
        paddingVertical: 7,
        paddingHorizontal: 35,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        fontSize:12,
    },
    buttonSelect: {
        height: 45,  // Altura ajustada
        width: '30%',  // Mejor distribución
        marginTop: '5%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        paddingHorizontal: 10, // Reduce espacio extra
    },
    buttonSelectPressed: {
        height: 45,
        width: '30%',
        marginTop: '5%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        paddingHorizontal: 10,
    },
    buttonSelectText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonSelectTextPressed: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: '#e0e0e0',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profilePic: {
        width: '20%',
        height: undefined,
        aspectRatio: 1,
    },
    centered: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    frontImage: {
        width: '250',
        height: '380',
        borderRadius: 30,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    icon: {
        width: '10%',
        height: undefined,
        aspectRatio: 1,
        justifyContent: 'center',
        
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
        fontFamily: 'Montserrat_700Bold',
    },
});

export default MainScreen;