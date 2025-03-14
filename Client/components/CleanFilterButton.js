import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Polygon, Line } from "react-native-svg";

const HexButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
      <Svg height="60" width="60" viewBox="0 0 100 100">
        {/* Hexágono */}
        <Polygon
          points="25,10 75,10 90,50 75,90 25,90 10,50"
          fill="#3A2F2F"
          stroke="black"
          strokeWidth="2"
        />
        {/* Línea diagonal de la 'X' */}
        <Line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="6" />
        <Line x1="70" y1="30" x2="30" y2="70" stroke="white" strokeWidth="6" />
      </Svg>
    </TouchableOpacity>
  );
};

export default HexButton;