import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuOpciones = ({ icons, screens, iconStyle, containerStyle }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, containerStyle]}>
            {icons.map((icon, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate(screens[index])}>
                    <Image source={icon} style={[styles.icon, iconStyle]} />
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
        width: 50, 
        height: 50,
        resizeMode: 'contain',
    },
});

export default MenuOpciones;
