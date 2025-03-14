import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions , Image} from 'react-native';
import PieGrafic from '../components/PieGrafic';
import { API_URL } from '@env';
import Header from '../components/Header';
import ChatButton from '../components/ChatButton';

const { width } = Dimensions.get('window');

const getImageForParty = (partyName) => {
  const partyImages = {
    "MORENA": require("../assets/LogoMorena.png"),
    "PAN": require("../assets/logoPan.png"),
    "MC": require("../assets/LogoMc.png"),
    "PT": require("../assets/LogoPt.png"),
    "PV": require("../assets/logoVerde.png"),
    "PRD": require("../assets/logoPrd.png"),
    "PRI": require("../assets/logoPri.png"),
    "CANDIDATURA INDEPENDIENTE": require("../assets/independiente.png")
  };

  return partyImages[partyName] ? Image.resolveAssetSource(partyImages[partyName]).uri : null;
};

const getColorForParty = (partyName) => {
  const partyColors = {
    "MORENA": "#B5261E",
    "PAN": "#0066CC",
    "MC": "#F08013",
    "PT": "#E30613",
    "PV": "#4CAF50",
    "PRD": "#FFD700",
    "PRI": "#C8102E",
    "CANDIDATURA INDEPENDIENTE": "#808080"
  };
  return partyColors[partyName] || "#000000";
};

const GraficScreen = () => {
  const [fetchdata, setFetchData] = useState({ labels: [], data: [], colors: [], images: [] });

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const responseVotes = await fetch(`${API_URL}/api/vote/count_votes/PRESIDENCIA/NACIONAL`);
        const voteResults = await responseVotes.json();

        const responseParties = await fetch(`${API_URL}/api/political_party`);
        const partyList = await responseParties.json();

        const labels = [];
        const data = [];
        const colors = [];
        const images = [];

        voteResults.forEach(vote => {
          const party = partyList.find(p => p.name === vote.party);
          if (party) {
            labels.push(String(party.name));
            data.push(Number(vote.voteCount) || 0);
            colors.push(String(getColorForParty(party.name)));
            images.push(getImageForParty(party.name));
          }
        });

        setFetchData({ labels, data, colors, images });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchVotes();
  }, []);

  return (
    <View style={[{marginTop:30,}]}> 
        <View style={[{marginBottom:300,}]}>
            <Header/>
        </View>
        <View style={styles.container}>
            <PieGrafic fetchdata={fetchdata} />
        </View>
        <ChatButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom:350,
  },
});

export default GraficScreen;