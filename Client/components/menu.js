import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuOpciones = ({ icons, screens, iconStyle, containerStyle }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, containerStyle, {gap:20}]}>
            {icons.map((icon, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate(screens[index])}>
                        <Image source={icon} style={[styles.icon, iconStyle]} />
                    </TouchableOpacity>
                    {index < icons.length - 1 && <View style={styles.verticalSeparator} />}
                </React.Fragment>
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
    verticalSeparator: {
        width: 2,
        height: '100%',
        backgroundColor: '#000',
        marginHorizontal: 10,
    },
});

export default MenuOpciones;
