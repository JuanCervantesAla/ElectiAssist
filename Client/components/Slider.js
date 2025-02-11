import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const data = [
  require("../assets/candidatos.jpg"),
  require("../assets/tribunal.jpg"),
  require("../assets/casillas.png"),
];

console.log(data)

const ImageCarousel = () => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true} 
        autoplay={true} 
        autoplayTimeout={3} 
        loop={true} 
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.5,
    height: 2,
    borderRadius: 10,
  },
});

export default ImageCarousel;