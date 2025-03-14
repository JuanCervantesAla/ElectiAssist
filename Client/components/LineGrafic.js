import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineGrafic = ({ labels, data }) => {
  const chartData = {
    labels: labels, // Etiquetas del eje X
    datasets: [
      {
        data: data, // Datos para el gráfico
        strokeWidth: 2, // Ancho de la línea
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de la línea
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width } // Ancho del gráfico
        height={Dimensions.get("window").width -50} // Altura del gráfico
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#D3C3B6",
          backgroundGradientTo: "#D3C3B6",
          decimalPlaces: 0,
          color: () => "rgba(0, 0, 0, 0.8)", // Color de las etiquetas
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de las etiquetas
          propsForLabels: {
            fontSize: 12, // Tamaño de la fuente de las etiquetas
            fontWeight: "bold", // Negrita para las etiquetas
          },
        }}
        withVerticalLines={true} // Mostrar líneas verticales
        withHorizontalLines={true} // Mostrar líneas horizontales
        fromZero={true} // Hace que el eje Y empiece desde 0
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default LineGrafic;