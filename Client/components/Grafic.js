import { Text, View, StyleSheet, Image } from "react-native";
import Barras from "../assets/barras.png";
import Lineas from '../assets/lineas.png';
import Pastel from '../assets/pastel.png';
import { useEffect, useState } from "react";
import BarsGrafic from '../components/BarsGrafics';
import PieGrafic from './PieGrafic.js';

import LineGrafic from "./LineGrafic";
import GraficChooser from "./GraficChoser";

const Grafic = ({fetchdata,year,state,level}) => {
    const[title,setTitle]=useState('BARRAS')
    const[Titulo,setTitulo]=useState('');
    
    useEffect(()=>{
        setTitulo(title === 'BARRAS' ? Barras : title === 'PASTEL'? Pastel : Lineas);
    },[]);


    return (
        <View style={styles.container}>
            <View style={styles.titleBackground}>
                <Text style={styles.title}>
                    {year}/{state}/{level}
                </Text>
            </View>
            <View style={styles.grafics}>
                {Titulo === Barras &&(
                    <BarsGrafic labels={fetchdata.labels} data={fetchdata.data}/>
                )}
                {Titulo === Pastel&&(
                    <PieGrafic fetchdata = {fetchdata}/>
                )}
                {Titulo === Lineas&&(
                    <LineGrafic labels={fetchdata.labels} data={fetchdata.data}/>
                )}
            </View>
            <View>
            <GraficChooser
                    icons={[Barras, Pastel, Lineas]} 
                    containerStyle={{ marginTop: 10 }}
                    changer={setTitle}
                    grafic={setTitulo}
                    titles={["BARRAS","PASTEL","LINEAS"]} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Esto asegura que el contenedor ocupe todo el espacio disponible
        alignItems: 'center', // Centra el contenido horizontalmente
    },
    titleBackground: {
        backgroundColor: '#3D5146',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row', // Alinea los elementos en fila
        alignItems: 'center', // Centra los elementos verticalmente dentro del contenedor
        justifyContent: 'center', // Centra los elementos horizontalmente dentro del contenedor
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        // Eliminado marginBottom para mantener el texto y la imagen alineados verticalmente
    },grafics:{
        flex:1

    }
});

export default Grafic;