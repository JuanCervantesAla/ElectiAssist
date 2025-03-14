import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const VotingScreen = () => {
    const [position, setPosition] = useState('PRESIDENCIA');
    const [state, setState] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [politicalParties, setPoliticalParties] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [states, setStates] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) setUserId(storedUserId);
            } catch (error) {
                console.error('Error al obtener userId:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch(`${API_URL}/api/candidate`);
                const data = await response.json();
                setCandidates(data);
                setStates([...new Set(data.map(candidate => candidate.state))]);
                setPoliticalParties([...new Set(data.map(candidate => candidate.political_party.name))]);
            } catch (error) {
                console.error('Error al cargar candidatos:', error);
            }
        };
        fetchCandidates();
    }, []);

    useEffect(() => {
        setFilteredCandidates(
            candidates.filter(candidate => 
                candidate.position === position && 
                (state === '' || candidate.state === state)
            )
        );
    }, [position, state, candidates]);

    const handleVote = async () => {
        if (!userId) {
            Alert.alert('Error', 'No se ha detectado un usuario autenticado.');
            return;
        }
        if (!selectedCandidate) {
            Alert.alert('Error', 'Por favor, selecciona un candidato.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/vote/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, candidateId: selectedCandidate.id, position })
            });
            const responseText = await response.text();
            if (!response.ok) throw new Error(`Error al registrar el voto: ${responseText}`);
            Alert.alert('Voto registrado', `Has votado por ${selectedCandidate.name}`);
            setSelectedCandidate(null);
        } catch (error) {
            console.error('Error al enviar el voto:', error);
            Alert.alert('Error', `Hubo un problema al enviar tu voto: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.header}>Simulación de Votos</Text>
                <Text style={styles.subHeader}>Elecciones 2024</Text>
                <Picker selectedValue={position} onValueChange={setPosition} style={styles.picker}>
                    <Picker.Item label="Presidencia" value="PRESIDENCIA" />
                    <Picker.Item label="Senaduría" value="SENADURIA" />
                    <Picker.Item label="Diputado" value="DIPUTADO" />
                </Picker>
                <Picker selectedValue={state} onValueChange={setState} style={styles.picker}>
                    <Picker.Item label="Todos los estados" value="" />
                    {states.map((s, i) => <Picker.Item key={i} label={s} value={s} />)}
                </Picker>
                <FlatList
                    data={filteredCandidates}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[styles.card, item.id === selectedCandidate?.id && styles.selectedCard]} 
                            onPress={() => setSelectedCandidate(item)}
                        >
                            <Image source={{ uri: `${API_URL}/api/political_party/image/${item.political_party.id}` }} style={styles.image} />
                            <View>
                                <Text style={styles.title}>{item.political_party.name}</Text>
                                <Text style={styles.subtitle}>{item.name}</Text>
                                <Text style={styles.state}>Estado: {item.state}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.noData}>No hay candidatos disponibles</Text>}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
                <TouchableOpacity style={styles.button} onPress={handleVote} disabled={!userId}>
                    <Text style={styles.buttonText}>Enviar Voto</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#F4F4F4' },
    container: { flex: 1, padding: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
    subHeader: { fontSize: 18, textAlign: 'center', marginBottom: 10, color: '#555' },
    picker: { backgroundColor: '#FFF', marginBottom: 10 },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    selectedCard: { backgroundColor: '#4CAF50' },
    image: { width: 50, height: 50, marginRight: 10, resizeMode: 'contain' },
    title: { fontSize: 16, fontWeight: 'bold' },
    subtitle: { fontSize: 14, color: '#555' },
    state: { fontSize: 14, color: '#777' },
    button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#FFF', fontSize: 16 }
});

export default VotingScreen;
