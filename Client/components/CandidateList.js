import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { API_URL } from '@env';

export default function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchPosition, setSearchPosition] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchParty, setSearchParty] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/candidate`)
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setFilteredCandidates(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = candidates.filter((candidate) => 
      candidate.position.toLowerCase().includes(searchPosition.toLowerCase()) &&
      candidate.state.toLowerCase().includes(searchState.toLowerCase()) &&
      candidate.political_party.name.toLowerCase().includes(searchParty.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [searchPosition, searchState, searchParty, candidates]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por posición"
        value={searchPosition}
        onChangeText={setSearchPosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Buscar por estado"
        value={searchState}
        onChangeText={setSearchState}
      />
      <TextInput
        style={styles.input}
        placeholder="Buscar por partido político"
        value={searchParty}
        onChangeText={setSearchParty}
      />

      {/* Lista de candidatos */}
      <FlatList
        data={filteredCandidates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Posición: {item.position}</Text>
              <Text>Estado: {item.state}</Text>
              <Text>Partido: {item.political_party.name}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    marginVertical: 8,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

