import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, AbhayaLibre_800ExtraBold } from "@expo-google-fonts/abhaya-libre";
import AppNavigator from './navigation/AppNavigator';
import { FontsLoader } from "./components/FontLoader"; 
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    AbhayaLibreExtraBold: AbhayaLibre_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <FontsLoader>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FontsLoader>
  );
}
