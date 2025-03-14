import React, { useState, useEffect } from "react";
import { View,  StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import TopHeader from "../components/TopHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ElectionHeader from "../components/ElectionHeader";
import useCandidates from "../hooks/useCandidates";
import NextButton from "../components/NextButton";

export default function BallotScreen() {

    const [selectedPosition, setSelectedPosition] = useState("Presidente");
    const [selectedParty, setSelectedParty] = useState(null);
    // Hook para manejar la carga de informacion por cargo
    const {candidates, loading } = useCandidates(selectedPosition);
   
    // Limpia de selecciones cuando se cambia de boleta
    useEffect(()=>{
        setSelectedParty(null);
    }, [selectedPosition]);


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TopHeader Button={NextButton} />
          </View>
          <View>
              <ElectionHeader title={'Simulación de votos '} selectedPosition={selectedPosition} onPositionChange={setSelectedPosition}/>

              {/* Indicador de carga */}
              {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                  <FlatList
                      numColumns={2}
                      data={candidates}
                      keyExtractor={(item) => item.id}
                      renderItem={({item}) => (
                          <PartyCard
                              id = {item.id}
                              name={item.name}
                              party={item.party}
                              logo={item.logo}
                              isSelected={selectedParty === item.id}
                              onPress={() => setSelectedParty(selectedParty === item.id ? null : item.id)}
                          />
                      )}
                  />
              )}


            {candidates.length > 0 && (
              <View style={styles.container_button}>
                {/* Botón para enviar el voto (simulado) */}
                <TouchableOpacity style={[styles.voteButton, selectedParty === null && styles.disabledButton]} 
                  onPress={() => selectedParty? alert(`Voto enviado por ${selectedParty} para ${selectedPosition}`) : null}
                  disabled={selectedParty === null}
                >
                  <Text style={styles.voteText}>Enviar Voto</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que ocupe toda la pantalla
    backgroundColor: "#fff",
    padding: 10,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 5,

  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  candidateCard: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: "#ddd", 
    margin: 5, 
    alignItems: "center", 
    borderRadius: 10
},
  candidateName: { 
    fontSize: 16, 
    fontWeight: "bold" 
},
  party: { fontSize: 14, 
    color: "#666" 
},
  voteButton: { 
    backgroundColor: "#10B981",
    padding: 10,
    width: '70%',
    marginTop: 10, 
    alignItems: "center", 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
  voteText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#fff" 
},
  disabledButton: {
    backgroundColor: "#A3A3A3", // Un color más claro para indicar que está deshabilitado
},
container_button: {
  alignItems: "center", // Centra el botón horizontalmente
  marginTop: 20,
},
});