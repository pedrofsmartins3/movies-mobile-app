import ScreenContainer from "@/components/screenContainer/ScreenContainer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

export default function download({}: Props) {
  return (
    <ScreenContainer>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ainda não possui downloads.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
