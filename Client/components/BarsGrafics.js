
import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarsGrafic = ({labels,data}) => {


  const chartData  = {
    labels: labels,
    datasets: [
      {
        data: data,
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={chartData }
        width={Dimensions.get("window").width }
        height={Dimensions.get("window").width -50}
        yAxisSuffix="%" // Puedes poner "K", "M", etc., si deseas
        yAxisInterval={10} // Define la frecuencia de las etiquetas en el eje Y
        chartConfig={{
          backgroundColor: "#ccc",
          backgroundGradientFrom: "#D3C3B6",
          backgroundGradientTo: "#D3C3B6",
          decimalPlaces: 0,
          color: () => "#3D5146", // Color uniforme para las barras
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontSize: 12, // Tamaño de los números
            fontWeight: "bold",
            
          },
        }}
        showBarTops={true} // Oculta los valores en la parte superior de las barras
        withInnerLines={true} // Muestra líneas de guía en el fondo
        withHorizontalLabels={true} // Asegura que los números se muestran en el eje Y
        fromZero={true} // Hace que el eje Y empiece desde 0
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default BarsGrafic;
