import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const card = ({title, description}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        borderBottomWidth:2,
        borderBlockColor: '#ccc',
        paddingTop:20,
        width:'80%',
        marginLeft:38
    },
    title: {
        fontSize: 18,
    },
    description : {
        fontSize:15,
    },

});

export default card
