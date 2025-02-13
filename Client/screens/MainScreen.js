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
import Icon from "react-native-vector-icons/AntDesign";
// import { SliderBox } from "react-native-image-slider-box";


const MainScreen = () => {
    // Estado para la búsqueda
    const [search, setSearch] = useState('');
    const [pressedButtonIndex, setPressedButtonIndex] = useState(null);

    const images = [
        Candidato,
        Casilla,
        Tribunal
    ];

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

            <View style={[styles.verticalView, {marginBottom: 40, marginTop: 20}]}>{/*Perfil y atras*/}
                <View style={styles.horizontalView}>
                    {/* Botón de retroceso */}
                    <TouchableOpacity
                    style={[styles.backButton, {marginLeft: 20}]}
                    onPress={() => navigation.goBack()}
                    >
                        <Icon name="leftcircle" style={styles.backButtonIcon} />
                    </TouchableOpacity>
                    <Image source={ImageProfile} style={[styles.profilePic, {marginRight: 20}]} />
                </View>
            </View>

            <View style={[styles.verticalView, {marginBottom: 25}]}>{/*Titulo*/}
                <Text style={styles.title}>Menu de Inicio</Text>
            </View>

            <View style={[styles.verticalView, {marginBottom: -15}]}>
                <SearchBar
                    placeholder="Escribe aquí..."
                    onChangeText={(text) => updateSearch(text)}
                    value={search}
                    platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                    containerStyle={ styles.searchBarContainer }
                    inputContainerStyle={styles.searchBarInputContainer}
                />

            </View>

            <View style={[styles.verticalView, {marginBottom: 35}]}>
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

            <View style={{ marginBottom: 20 }}> {/* Remove the verticalView style */}
                {/* <SliderBox 
                    images={images}
                    sliderBoxHeight={200}
                    dotColor={'#fff'}
                    inactiveDotColor="#90A4AE"
                    autoplay
                    circleLoop
                    resizeMode={'cover'}
                    ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
                /> */}
            </View>

            <View style={styles.verticalView}>
                <MenuOpciones
                    icons={[Home, Search, Message, Profile]} 
                    iconStyle={{ width: 30, height: 30 }} 
                    containerStyle={{ marginTop: 10 }}
                    screens={['ChatbotScreen','ChatbotScreen','ChatbotScreen','ChatbotScreen']} 
                />
            </View>
        </KeyboardAvoidingView>
        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    verticalView: {
        marginBottom: 15,
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
        fontSize: 34,
        fontFamily: 'Montserrat_700Bold',
        fontWeight: 'bold',
        paddingLeft: '5%'
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
        height: 45,
        width: '30%',  
        marginTop: '5%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        paddingHorizontal: 10,
        
    },
    buttonSelectPressed: {
        height: 45,
        width: '30%',
        marginTop: '5%',
        backgroundColor: '#10B981',
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
        width: '17%',
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
        width:'95%',
        backgroundColor: '#f5f5f5',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor:'#000',
        paddingLeft: '5%'
    },
    searchBarInputContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#000'
    },
    searchBarInput: {
        fontFamily: 'Montserrat_700Bold',
    },
    backButton: {
        top: 15,
        width: '12%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    backButtonIcon: {
        color: "#10B981",
        fontSize: 43, // Aumenté el tamaño para mejor visibilidad
    },
});

export default MainScreen;