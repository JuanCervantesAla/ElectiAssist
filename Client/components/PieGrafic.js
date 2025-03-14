import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';


const { width } = Dimensions.get('window');

const PieGrafic = ({fetchdata}) => {
  // Calculate total data sum for percentage calculation
  const totalData = fetchdata.data.reduce((sum, value) => sum + value, 0);

  // Calculate the angles for each segment
  let currentAngle = -90;
  const segmentAngles = fetchdata.data.map((value) => {
    const angle = (value / totalData) * 360;
    currentAngle += angle;
    return angle;
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <View style={{ position: 'relative' }}>
        {/* PieChart (Doughnut chart) */}
        <PieChart
          data={fetchdata.labels.map((label, index) => ({
            name: label,
            population: fetchdata.data[index],
            color: fetchdata.color[index],
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
            imageUri: fetchdata.image[index], // Use the image URLs or local paths
          }))}
          width={width}
          height={width - 30}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={width / 4}
          center={[0, 0]} // Center the chart
          absolute
          hasHole={true}  // Make it a doughnut
          holeRadius={0.4} // Hole size (0.4 means 40% of the radius)
          hasLegend={false}
        />

        {/* Dynamically overlay images */}
        {fetchdata.labels.map((label, index) => {
          // Calculate the angle for the position of the image
          const angle = segmentAngles[index] / 2 + segmentAngles.slice(0, index).reduce((a, b) => a + b, 0)+270;
          const radian = (angle * Math.PI) / 180;
          
          // Calculate x and y positions using cosine and sine
          const x = Math.cos(radian) * (width / 4); // Radius size
          const y = Math.sin(radian) * (width / 4);

          return (
            <Image
              key={index}
              source={fetchdata.image[index]} // Adjust image path accordingly
              style={[styles.flagImage, { top: width / 2 + y - 20, left: width / 2 + x - 20 }]} // Adjust image position
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flagImage: {
    backgroundColor:'#fff',
    position: 'absolute',
  },
});

export default PieGrafic;