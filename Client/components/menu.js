import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MenuOpciones = ({ icons, iconStyle, containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {icons.map((icon, index) => (
                <Image key={index} source={icon} style={[styles.icon, iconStyle]} />
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
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

<<<<<<< HEAD
export default MenuOpciones;
=======
export default MenuOpciones;
>>>>>>> 771e819 (Primer Merge)
