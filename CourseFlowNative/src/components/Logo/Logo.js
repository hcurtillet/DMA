import React from "react";
import logo from "./Logo.png";
import styled from "styled-components/native";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignContent: "center",
  },
});

export default function Logo() {
  return (
    <View>
      <Image style={styles.logo} source={logo} alt="logo" />
    </View>
  );
}
