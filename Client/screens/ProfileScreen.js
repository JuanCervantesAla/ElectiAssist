import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import { View, Text, Image, ActivityIndicator, StyleSheet  } from 'react-native';
import ChatButton from '../components/ChatButton';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          const response = await fetch(`${API_URL}/api/user/${storedUserId}`);
          if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
          }
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.profileContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : userData ? (
          <View style={styles.profileContent}>
            <Image 
              source={userData.id ? { uri: `${API_URL}/api/images/download/${userData.id}` } : require("../assets/PP.png")} 
              style={styles.avatarLarge} 
            />
            <Text style={styles.typeText}>Nombre Completo</Text>
            <View style={styles.containerText}>
              <Text style={styles.apiText}>{userData.name}</Text>
            </View>
            <Text style={styles.typeText}>Correo Electrónico</Text>
            <View style={styles.containerText}>
              <Text style={styles.apiText}>{userData.email}</Text>
            </View>
            <Text style={styles.typeText}>Curp</Text>
            <View style={styles.containerText}>
              <Text style={styles.apiText}>{userData.curp}</Text>
            </View>
            <Text style={styles.typeText}>Sección</Text>
            <View style={styles.containerText}>
              <Text style={styles.apiText}>{userData.section}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.errorText}>No se pudo cargar la información del usuario</Text>
        )}
      </View>
      <Text style={[styles.typeText,{paddingBottom:50}]}>Cambiar contrasena</Text>
      <ChatButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginTop: -10, // Ajusta según sea necesario
  },
  profileContent: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 22,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  containerText : {
    width:300,
    backgroundColor: '#ECE7E3',
    borderRadius: 20, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    alignSelf: 'center',
    marginBottom:20,
  },
  apiText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  typeText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;