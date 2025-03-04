import React from 'react'
import styles from '../styles/styles'
import { View, Text, Image ,Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const Header = () => {
  return (
    <View style={[styles.header, {width}]}>
        <Text style={[styles.headerText,{fontFamily:'AbhayaLibreExtraBold'}]}>Electi</Text>
        <Text style={[styles.headerText2,{fontFamily:'AbhayaLibreExtraBold', marginRight:110}]}>Assist</Text>
        <Image source={require("../assets/PP.png")} style={styles.avatar}></Image>
    </View>  
  );
};

export default Header
