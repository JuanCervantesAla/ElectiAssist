import React, { useState , useEffect} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ImageProfile from '../assets/PP.png';
import { SearchBar } from 'react-native-elements';
import Profile from '../assets/profile.png';
import Home from '../assets/home.png';
import Search from '../assets/search.png';
import Message from '../assets/message.png';
import MenuOpciones from '../components/menu';
import Icon from "react-native-vector-icons/AntDesign";
import Carousel, { Pagination } from 'react-native-snap-carousel';


const MainScreen = () => {
    const carouselRef = React.useRef(null);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [pressedButtonIndex, setPressedButtonIndex] = useState(null);
    const sliderWidth = 420; 
    const itemWidth = 350;
    const itemHeight = 400;  

    useEffect(() => {
        carouselRef?.current?.snapToItem(activeIndex, true);
    }, [activeIndex]);

    const [entries] = useState([
        { title: 'Candidatos', illustration: { uri: 'https://media.istockphoto.com/id/1391693595/es/vector/hombre-y-mujer-político-debatiendo.jpg?s=1024x1024&w=is&k=20&c=QylXU_tli07ekkNuYYb4TGw4y8kkKXJ3Klpoj4_ptEM=' } },
        { title: 'Casillas', illustration: { uri: 'https://oem.com.mx/elsoldetoluca/img/14738093/1685505486/BASE_LANDSCAPE/1200/voto.webp' } },
        { title: 'Articulos', illustration: { uri: 'https://eljuegodelacorte.nexos.com.mx/wp-content/uploads/2023/04/constitucional.jpg' } },
    ]);    

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Montserrat_700Bold,
    });

    const updateSearch = (text) => {
        setSearch(text);
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const handlePress = (index) => {
        setPressedButtonIndex(pressedButtonIndex === index ? null : index);
    };

    const _renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.illustration} style={styles.imageCarousel} />
            <Text style={styles.titleCarousel}>{item.title}</Text>
        </View>
    );    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={[styles.verticalView, { marginBottom: 40, marginTop: 1 }]}>
                <View style={styles.horizontalView}>
                    <TouchableOpacity
                        style={[styles.backButton, { marginLeft: 20 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="leftcircle" style={styles.backButtonIcon} />
                    </TouchableOpacity>
                    <Image source={ImageProfile} style={[styles.profilePic, { marginRight: 20 }]} />
                </View>
            </View>

            {/* Title Section */}
            <View style={[styles.verticalView, { marginBottom: 25 }]}>
                <Text style={styles.title}>Menu de Inicio</Text>
            </View>

            {/* Search Bar Section */}
            <View style={[styles.verticalView, { marginBottom: 10 }]}>
                <SearchBar
                    placeholder="Escribe aquí..."
                    onChangeText={(text) => updateSearch(text)}
                    value={search}
                    platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                />
            </View>

            {/* Buttons Section */}
            <View style={[styles.verticalView, { marginBottom: 10 }]}>
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

            {/* Gallery Section */}
            <View>
                <Carousel
                    ref={carouselRef}
                    data={entries}
                    renderItem={_renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    enableMomentum={true}
                    enableSnap={true}
                    decelerationRate="fast"
                    autoplay={true}
                    autoplayInterval={2000}
                />
                <CustomPagination activeIndex={activeIndex} entries={entries} />
            </View>


            {/* Bottom Menu Section */}
            <View style={[styles.verticalView, { marginTop: 20 }]}>
                <MenuOpciones
                    icons={[Home, Search, Message, Profile]}
                    iconStyle={{ width: 30, height: 30 }}
                    containerStyle={{ marginTop: 10 }}
                    screens={['ChatbotScreen', 'ChatbotScreen', 'ChatbotScreen', 'ChatbotScreen']}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const CustomPagination = ({ activeIndex, entries }) => {
    return (
        <View style={styles.paginationContainer}>
            {entries.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.paginationDot,
                        index === activeIndex && styles.paginationDotActive,
                    ]}
                />
            ))}
        </View>
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
        paddingLeft: '5%',
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
    profilePic: {
        width: '17%',
        height: undefined,
        aspectRatio: 1,
    },
    searchBarContainer: {
        width: '95%',
        backgroundColor: '#f5f5f5',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#000',
        paddingLeft: '5%',
    },
    searchBarInputContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
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
        fontSize: 43,
    },
    imageCarousel: {
        width: 300,
        height: 350,
        borderRadius: 40, 
        resizeMode: 'cover', 
    },
    titleCarousel: {
        fontSize: 21
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: '#10B981',
    },
});

export default MainScreen;