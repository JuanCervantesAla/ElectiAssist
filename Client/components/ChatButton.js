import React from 'react'
import { TouchableOpacity, Text, Image , View} from "react-native";
import styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';

const ChatButton = () => {

  const navigation = useNavigation();


  return (
    <View>
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatbotScreen')}>
        <Image source={require("../assets/chat.png")} style={styles.chatIcon} ></Image>
      </TouchableOpacity>
    </View>
  );
;}

export default ChatButton
