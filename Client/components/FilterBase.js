import { View,Text, StyleSheet, Image, Modal } from "react-native";
import Arrow from "../assets/Arrow.png"
import DELETE from "../assets/delete.png"
import CHECK from "../assets/check.png"
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";


const FilterBase =({setYear,setLevel,setState})=>{
    const [isVisibleLevel, setIsVisibleLevel] = useState(false);
    const [isVisibleYear, setIsVisibleYear] = useState(false);
    const [isVisibleState, setIsVisibleState] = useState(false);
    const optionLevel = ["Presidencia", "Senado", "Diputados", "Gubernaturas", "Congresos Estatales"];
    const optionYear = ["2000", "2006", "2012", "2018", "2024"];
    const optionState = [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Coahuila",
        "Colima",
        "Durango",
        "Estado de México",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas"
      ];
      

    const handleSelect = (option) => {
        setLevel(option);
        setIsVisibleLevel(false);
    };
    const handleSelectYear = (option) => {
        setYear(option);
        setIsVisibleYear(false);
    };
    const handleSelectState = (option) => {
        setState(option);
        setIsVisibleState(false);
    };
    return(
        <View style={styles.container}>
            <View style={styles.grupOfTwo}>
                <View style={styles.elections}>
                    <TouchableOpacity
                    style ={styles.button}
                    onPress={() => setIsVisibleYear(true)}
                    >
                        <Image
                            source={Arrow} // Adjust image path accordingly
                        />
                    </TouchableOpacity>
                    <Text style={styles.texto}>
                        Año Electoral
                    </Text>
                </View>
                <View style={styles.elections}>
                    <TouchableOpacity
                    style ={styles.button}
                    onPress={() => setIsVisibleLevel(true)}
                    >
                        <Image
                            source={Arrow} // Adjust image path accordingly
                        />
                    </TouchableOpacity>
                    <Text style={styles.texto}>
                        Nivel
                    </Text>
                </View>
            </View>
            <View style={styles.grupOfTwo}>
                <View style={styles.elections}>
                    <TouchableOpacity
                    style ={styles.button}
                    onPress={() => setIsVisibleState(true)}
                    >
                        <Image
                            source={Arrow} // Adjust image path accordingly
                        />
                    </TouchableOpacity>
                    <Text style={styles.texto}>
                        Estado
                    </Text>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity
                    >
                        <Image
                            source={DELETE} // Adjust image path accordingly
                        />
                        <Text>limpiar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <Image
                            source={CHECK} // Adjust image path accordingly
                        />
                        <Text>aplicar</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={isVisibleLevel} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisibleLevel(false)}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={optionLevel}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
                </Modal>
                <Modal visible={isVisibleYear} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisibleYear(false)}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={optionYear}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelectYear(item)}>
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
                </Modal>
                <Modal visible={isVisibleState} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisibleState(false)}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={optionState}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelectState(item)}>
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
                </Modal>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    options:{
        flex: 1, 
        maxWidth: "40%", 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        gap: 20,
    },
    container:{},
    grupOfTwo:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap:20,
        marginVertical:5
    },
    elections:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#3D5146',
        borderRadius: 5,
        paddingHorizontal:5,
        maxWidth:"40%",
        alignItems: 'center', // Para evitar que el texto desborde la altura
        paddingVertical: 8, // Ajusta el espacio interno
    },
    button:{
        backgroundColor:"#fff",
        borderRadius:5,
        width: 30, // Fija un ancho para evitar expansión
        height: 30, // Fija una altura para que no cambie
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto:{
        flex:1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 14, // Tamaño adecuado para que no expanda la altura
    },
    image:{
        width: 20, // Ajusta tamaño fijo de imagen
        height: 20, 
        resizeMode: 'contain', // Evita que crezca fuera del tamaño
    },overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: "#FFF",
        width: 250,
        borderRadius: 5,
        padding: 10,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
    optionText: {
        fontSize: 16,
        textAlign: "center",
    },
})


export default FilterBase;