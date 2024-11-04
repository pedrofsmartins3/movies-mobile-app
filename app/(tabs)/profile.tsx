import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "@/components/screencontainer/ScreenContainer";

type Props = {};

export default function profile({}: Props) {
  return (
    <ScreenContainer>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Não tem nenhum filme nem série na sua coleção.
        </Text>
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
