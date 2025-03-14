import React from 'react';
import { View, Dimensions, Image, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const PieGrafic = ({ fetchdata }) => {
  if (!fetchdata || !fetchdata.data || !fetchdata.labels || !fetchdata.colors || !fetchdata.images) {
    return <View><Text>Cargando datos...</Text></View>;
  }

  const totalData = fetchdata.data.length > 0 ? fetchdata.data.reduce((sum, value) => sum + value, 0) : 1;

  // Asegurar que las imágenes sean válidas
  const safeImages = fetchdata.images.map(img => {
    if (typeof img === "number") {
      return require('../assets/placeholder.png'); // Imagen por defecto si es un número
    } else if (typeof img === "string") {
      return { uri: img }; // Es una URL válida
    } else {
      return require('../assets/placeholder.png'); // Otra seguridad extra
    }
  });

  // Calcular los ángulos para posicionar las imágenes
  const calculateImagePosition = (index) => {
    const totalSlices = fetchdata.data.length;
    const startAngle = (index / totalSlices) * 2 * Math.PI; // Ángulo inicial de la porción
    const midAngle = startAngle + (Math.PI / totalSlices); // Ángulo medio de la porción

    const radius = width / 4; // Radio del gráfico
    const imageSize = 30; // Tamaño de la imagen

    // Calcular las coordenadas (x, y) para la imagen
    const x = radius * Math.cos(midAngle) + width / 2 - imageSize / 2;
    const y = radius * Math.sin(midAngle) + width / 2 - imageSize / 2;

    return { x, y };
  };

  return (
    <View style={styles.container}>
      <PieChart
        data={fetchdata.labels.map((label, index) => ({
          name: label,
          population: fetchdata.data[index] || 0,
          color: fetchdata.colors[index] || '#ccc',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        }))}
        width={width}
        height={220} // Ajusta este valor según sea necesario
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15" // Ajusta este valor según sea necesario
        center={[0, 0]}
        absolute
      />

      {/* Posicionar las imágenes encima del gráfico */}
      {fetchdata.labels.map((label, index) => {
        const imageSource = safeImages[index] && typeof safeImages[index] === "object" ? safeImages[index] : require("../assets/placeholder.png");
        const position = calculateImagePosition(index);

        return (
          <Image
            key={index}
            source={imageSource}
            style={[
              styles.imageOnChart,
              { left: position.x, top: position.y },
            ]}
          />
        );
      })}

      {/* Leyenda debajo del gráfico */}
      <View style={styles.legendContainer}>
        {fetchdata.labels.map((label, index) => {
          const imageSource = safeImages[index] && typeof safeImages[index] === "object" ? safeImages[index] : require("../assets/placeholder.png");

          return (
            <View key={index} style={styles.legendItem}>
              <Image source={imageSource} style={styles.legendImage} />
              <Text style={styles.legendText}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative', // Necesario para posicionar las imágenes encima del gráfico
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row', // Cambia a 'row' si prefieres que los elementos estén en una fila
    flexWrap: 'wrap', // Permite que los elementos se envuelvan si no caben en una fila
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 10, // Añade margen derecho para separar los elementos
  },
  legendImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain', // Para evitar que la imagen se deforme
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  imageOnChart: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute', // Posiciona las imágenes encima del gráfico
  },
});

export default PieGrafic;