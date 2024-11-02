import React from "react";
import { Platform } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  variant: string;
  color: string;
  onPress: () => void;
};

export default function Button({
  title = "",
  variant = "",
  color = "",
  onPress = () => {},
}: Props) {
  const isSmall = variant === "small";
  const isWhite = color === "white";
  const isFullWidth = variant === "fullWitdh";
  const isWEB = Platform.OS === "web";

  const correctWith = isWEB ? 250 : isFullWidth ? 350 : "auto";

  const styles = StyleSheet.create({
    button: {
      backgroundColor: isWhite ? "white" : "transparent",
      paddingVertical: isSmall ? 8 : 12,
      paddingHorizontal: isSmall ? 16 : 24,
      borderRadius: isSmall ? 12 : 8,
      alignItems: "center",
      borderColor: "#4e4c49",
      borderWidth: 1,
      width: correctWith,
      display: "flex",
      justifyContent: "center",
    },

    buttonText: {
      color: isWhite ? "#000" : "#FFFFFF",
      fontSize: 16,
      fontWeight: 700,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
