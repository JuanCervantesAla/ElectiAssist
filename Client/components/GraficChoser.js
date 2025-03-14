
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Barras from "../assets/barras.png";
import Lineas from '../assets/lineas.png';
import Pastel from '../assets/pastel.png';
const GraficChooser = ({ icons, changer, containerStyle,titles,grafic }) => {
    const handleChange=(index)=>{
        changer(titles[index])
        grafic(titles[index] === 'BARRAS' ? Barras : titles[index] === 'PASTEL'? Pastel : Lineas);
    }
    return (
        <View style={[styles.container, containerStyle]}>
            {icons.map((icon, index) => (
                <TouchableOpacity key={index} onPress={() => {handleChange(index)}}>
                    <Image source={icon} style={[styles.icon]} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        padding: 10,
    },
    icon: {
        width: 70, 
        height: 40,
        resizeMode: 'contain',
        backgroundColor:"#3D5146",
        borderRadius:20
    },
});

export default GraficChooser;
