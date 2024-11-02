import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
import { useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
type Props = {};

export default function DetailHeader({}: Props) {
  const isWEB = Platform.OS === "web";
  const navigation = useNavigation();

  if (!isWEB) {
    return (
      <View style={styles.headerMobile}>
        <AntDesign
          name="leftcircle"
          size={36}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Logo />
      </View>
    );
  } else {
    return <Navbar />;
  }
}

const styles = StyleSheet.create({
  headerMobile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
});
