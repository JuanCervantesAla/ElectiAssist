import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import Grafic from '../components/Grafic';
import PAN from '../assets/logoPan.png';
import PRI from '../assets/logoPri.png';
import PT from '../assets/LogoPt.png';
import MC from '../assets/LogoMc.png';
import MORENA from '../assets/LogoMorena.png';
import circle from '../assets/Pluscircle.png';
import { useState, useEffect } from 'react';
import FilterBase from '../components/FilterBase';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';
import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');

// Asociación de IDs de candidatos con sus partidos e imágenes
const candidateData = {
    9169: { party: "PRI", color: "#FFFFFF", image: PRI },
    9184: { party: "PAN", color: "#0066CC", image: PAN },
    10193: { party: "PT", color: "#EEE500", image: PT },
    10234: { party: "MORENA", color: "#B5261E", image: MORENA },
    10345: { party: "MC", color: "#F08013", image: MC }
};

const GraficScreen = () => {
    const [level, setLevel] = useState("presidencia");
    const [year, setYear] = useState("2024");
    const [state, setState] = useState("jalisco");
    const [filterWidth, setFilterWidth] = useState("28%");
    const [pressed, setPressed] = useState(false);
    const [fetchdata, setFetchData] = useState({ labels: [], data: [], color: [], image: [] });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await fetch(`${API_URL}/api/vote/count_votes`);
                const voteResults = await response.json();

                const filteredVotes = voteResults.filter(vote => vote.position.toLowerCase() === level.toLowerCase());
                
                console.log("Datos filtrados:", filteredVotes);

                // Mapea los datos para la gráfica
                const labels = [];
                const data = [];
                const color = [];
                const image = [];

                filteredVotes.forEach(vote => {
                    const candidateInfo = candidateData[vote.candidateId];
                    if (candidateInfo) {
                        labels.push(candidateInfo.party);
                        data.push(vote.voteCount);
                        color.push(candidateInfo.color);
                        image.push(candidateInfo.image);
                    }
                });

                setFetchData({ labels, data, color, image });
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchVotes();
    }, [level]); // Se ejecuta cada vez que `level` cambie

    const toggleFilterWidth = () => {
        setFilterWidth(pressed ? "28%" : "5%");
        setPressed(!pressed);
    };

    return (
        <View style={styles.container}>
            {/* Header fijo en la parte superior */}
            <View style={styles.headerContainer}>
                <Header />
            </View>

            {/* Botón de regreso */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="leftcircle" style={styles.backButtonIcon} />
            </TouchableOpacity>
            
            {/* Contenedor de la gráfica */}
            <View style={styles.grafics}>
                <Grafic fetchdata={fetchdata} year={year} state={state} level={level} />
            </View>
            
            {/* Contenedor de filtros */}
            <View style={styles.filterContainer}>
                <View style={[styles.filterTop, { marginHorizontal: filterWidth }]}> 
                    <TouchableOpacity style={styles.filterButton} onPress={toggleFilterWidth}>
                        <Image source={circle} />
                    </TouchableOpacity>
                    <Text style={styles.texto}>Agregar filtros</Text>
                </View>
                {pressed && <View style={styles.filterBase}><FilterBase setLevel={setLevel} setState={setState} setYear={setYear} /></View>}
            </View>
            
            <ChatButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e6e1',
        paddingTop: 60, // Evita que el contenido se solape con el Header
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 90, // Debajo del Header
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    grafics: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90, // Espacio debajo del Header y del botón de regreso
    },
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
        marginTop: -200
    },
    filterTop: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D5146',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 200,
    },
    filterButton: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 30,
    },
    texto: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
    },
    filterBase: {
        backgroundColor: "#E0E0E0",
        borderRadius: 20,
        padding: 10,
        width: '90%',
    },
    chatButtonContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default GraficScreen;
