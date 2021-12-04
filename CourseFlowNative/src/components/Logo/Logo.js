import React from "react";
import logo from "./Logo.png";
import styled from "styled-components/native";
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logo:{
    width: 80,
    height: 80,
    marginBottom: 30,
    alignContent: 'center'
  }


})

export default function Logo() {
  return (
    <View>
      <Image style={styles.logo} source={logo} alt="logo" />
    </View>
  );
}
