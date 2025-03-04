import React, { createContext, useContext } from "react";
import { useFonts, AbhayaLibre_800ExtraBold } from "@expo-google-fonts/abhaya-libre";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const FontContext = createContext(false);

export function useFontLoaded() {
  return useContext(FontContext);
}

export const FontsLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    AbhayaLibreExtraBold: AbhayaLibre_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View />; // No renderiza nada hasta que las fuentes estén listas
  }

  SplashScreen.hideAsync(); // Oculta la pantalla de carga

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};
