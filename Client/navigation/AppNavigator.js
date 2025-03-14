import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import TutorialScreen from '../screens/TutorialScreen.js';
import BibliotecaCandidatos from '../screens/BibliotecaCandidatos';
import BibliotecaPartidos from '../screens/BibliotecaPartidos';
import BibliotecaProcesos from '../screens/BibliotecaProcesos';
import NewsScreen from '../screens/NewsScreen';
import CasillasScreen from '../screens/CasillasScreen';
import MapsScreen from '../screens/MapsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GraficasVoto from '../screens/GraficasVoto';
import VotingScreen from '../screens/VotingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatbotScreen"
        component={ChatbotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TutorialScreen"
        component={TutorialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BibliotecaCandidatos"
        component={BibliotecaCandidatos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BibliotecaPartidos"
        component={BibliotecaPartidos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BibliotecaProcesos"
        component={BibliotecaProcesos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CasillasScreen"
        component={CasillasScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapsScreen"
        component={MapsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GraficasVoto"
        component={GraficasVoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VotingScreen"
        component={VotingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;