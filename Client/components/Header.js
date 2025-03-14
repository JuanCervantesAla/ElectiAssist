import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import styles from '../styles/styles';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserImage(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchUserImage = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/images/download/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }
      
      const imageUrl = await response.text();
  
      setUserImage(imageUrl); 
    } catch (error) {
      console.error("Error fetching user image:", error.message);
    }
  };
  
  

  return (
    <View style={[styles.header, { width }]}>
      <Text style={[styles.headerText, { fontFamily: 'AbhayaLibreExtraBold' }]}>Electi</Text>
      <Text style={[styles.headerText2, { fontFamily: 'AbhayaLibreExtraBold', marginRight: 110 }]}>Assist</Text>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Image
          source={userImage ? { uri: `${API_URL}/api/images/download/${userId}` } : require("../assets/PP.png")}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
