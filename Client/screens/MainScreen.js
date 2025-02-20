import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button, TouchableHighlight, Dimensions, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ImageProfile from '../assets/PP.png';
import { SearchBar } from 'react-native-elements';
import Profile from '../assets/profile.png';
import Home from '../assets/home.png';
import Search from '../assets/search.png';
import Message from '../assets/message.png';
import MenuOpciones from '../components/menu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckToSlot, faLandmarkDome, faNewspaper, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import Card from '../components/card';

const MainScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pressedButtonIndex, setPressedButtonIndex] = useState(null);
    const [selected, setSelected] = useState(null);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try { 
                const response = await fetch(`${API_URL}/api/article`);
                const result = await response.json();
                setArticle(result);

                console.log(result);
                console.log("Hello");
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();

    },[]);
    
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.snapToItem(activeIndex, true);
        }
    }, [activeIndex]);

    const [entries] = useState([
        { title: 'Candidatos', subTitle: 'Presidentes y Gobernadores', icon: faLandmarkDome, illustration: { uri: 'https://media.istockphoto.com/id/1280004154/es/vector/el-día-de-las-elecciones-mujer-presidenta-en-el-diseño-de-vector-de-podio.jpg?s=1024x1024&w=is&k=20&c=oW9RiX6qD44UBaW2y1wMb9rVgZI2HlACblQ1C-syeD4=' } },
        { title: 'Casillas', subTitle: 'Ubica tu casilla de voto', icon: faCheckToSlot, illustration: { uri: 'https://oem.com.mx/elsoldetoluca/img/14738093/1685505486/BASE_LANDSCAPE/1200/voto.webp' } },
        { title: 'Artículos', subTitle: 'Conoce más de la política mexicana', icon: faNewspaper, illustration: { uri: 'https://eljuegodelacorte.nexos.com.mx/wp-content/uploads/2023/04/constitucional.jpg' } },
    ]);    

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_700Bold });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const handlePress = (index) => {
        setPressedButtonIndex(pressedButtonIndex === index ? null : index);
    };

    const _renderItem = ({ item }) => (
            <View style={styles.slide}>
                <Image source={item.illustration} style={styles.imageCarousel} />
                <View style={styles.insideText}>
                    <Text style={styles.titleCarousel}>{item.title}</Text>
                    <View style={[styles.horizontalView , {paddingLeft: 10, marginTop:15}]}>
                        {item.icon && <FontAwesomeIcon icon={item.icon} size={30} color="white" />}
                        <Text style={[styles.subtitleCarousel, {marginBottom: -5, paddingLeft: 15}]}>{item.subTitle}</Text>
                    </View>
                </View>
            </View>
    );  

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={[styles.verticalView, { marginBottom: 25, marginTop: 10, marginLeft: 10 }]}>
                <View style={[styles.horizontalView, { gap: 20 }]}>
                    <Text style={[styles.title, { marginRight: 150 }]}>EA</Text>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={30} color="black" />
                    <Image source={ImageProfile} style={[styles.profilePic, { marginRight: 10 }]} />
                </View>
            </View>

            <View style={[{ marginLeft: -10 , marginBottom: 30}]}>
                <Carousel
                    ref={carouselRef}
                    data={entries}
                    renderItem={_renderItem}
                    sliderWidth={screenWidth - 40}
                    itemWidth={screenWidth}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    enableMomentum={true}
                    enableSnap={true}
                    decelerationRate="fast"
                    autoplay={true}
                    autoplayInterval={2000}
                />
            </View>

            <View style={[styles.verticalView, { marginBottom: 15 }]}>
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
            
            <View style={[styles.horizontalView, { justifyContent: 'center', gap: 70 }]}>
                {["Top Articulos", "Top Candidatos"].map((text, index) => (
                    <Pressable 
                        key={index}
                        onPress={() => {setSelected(index);}} 
                        style={[
                            styles.pressable, 
                            selected === index && styles.pressableSelected
                        ]}
                    >
                        <Text style={selected === index ? styles.textSelected : styles.text}>
                            {text}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={[{borderBottomWidth:2, borderBlockColor: '#ccc', paddingTop:25, width:'90%', marginLeft:20}]}></View>

            <View style={[styles.verticalView, {marginBottom:50}]}>
                <ScrollView style={styles.scrollContainer}>
                    {article.length > 0 ? (
                        article.map((article, index) => (
                            <Card key={index} title={article.title} description={article.description} />
                        ))
                    ) : (
                        <p>Loading articles...</p>
                    )}
                </ScrollView>
            </View>

            <View style={[styles.verticalView, { marginTop: 5, flex:1 }]}>
                <View style={styles.menuContainer}>
                    <MenuOpciones
                        icons={[Home, Search, Message, Profile]}
                        iconStyle={{ width: 30, height: 30 }}
                        containerStyle={{ marginTop: 10 }}
                    />
                </View>
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
        paddingLeft: '5%',
        color:'#10B981',
    },
    profilePic: {
        width: '17%',
        height: undefined,
        aspectRatio: 1,
        marginRight:60,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCarousel: {
        width: '80%',  
        height: 200,  
        resizeMode: 'cover',
        borderRadius: 30,  
    },
    insideText: {
        position: 'absolute',
        bottom: 0,
        left: 40,
        width:'60%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
    },
    titleCarousel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitleCarousel: {
        color: 'white',
        fontSize: 14,
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalViewButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    buttonSelect: {
        height: 45,
        width: '30%', 
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        paddingHorizontal: 10,
        borderWidth: 2, 
        borderColor: '#10B981',
    },
    buttonSelectPressed: {
        height: 45,
        width: '30%',
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
        borderWidth: 2, 
        borderColor: '#10B981',
    },
    buttonSelectText: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
        color: '#10B981',
    },
    buttonSelectTextPressed: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#10B981',
        borderRadius: 25,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    horizontalViewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pressable: {
        borderBottomWidth: 2,
        borderColor: '#000',
        paddingBottom: 5,
    },
    pressableSelected: {
        borderColor: '#10B981',
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
    textSelected: {
        fontSize: 18,
        color: '#10B981',
        fontWeight: 'bold',
    },
    menuContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: '#fafafa',
        paddingVertical: 5,
        borderTopWidth: 1,  
        borderTopColor: '#ccc',
        alignItems: 'center',
        borderWidth: 2,
        borderColor:'#000',
        borderRadius:40,  
    },
    scrollContainer: {
        maxHeight: 280, // Establece una altura máxima con scroll
    },
});

export default MainScreen;
