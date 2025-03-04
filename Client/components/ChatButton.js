import React from 'react'
import { TouchableOpacity, Text, Image } from "react-native";
import styles from '../styles/styles'

const ChatButton = () => {
  return (
    <TouchableOpacity style={styles.chatButton}>
        <Image source={require("../assets/chat.png")} style={styles.chatIcon}></Image>
    </TouchableOpacity>
  );
;}

export default ChatButton
