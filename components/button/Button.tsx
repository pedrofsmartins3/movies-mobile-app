import AntDesign from "@expo/vector-icons/AntDesign";
import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

type AntDesignIconNames = "" | "home" | "search1" | "download" | "user";

type Props = {
  title: string;
  onPress: () => void;
  icon: AntDesignIconNames;
};

export default function Button({
  title = "",
  onPress = () => {},
  icon = "home",
}: Props) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "rgba(255,255,255,1)",
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
      borderColor: "#4e4c49",
      borderWidth: 1,
      width: "auto",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      gap: 6,
    },
    buttonText: {
      color: "#000",
      fontSize: 16,
      fontWeight: 700,
    },
  });

  return (
    <MotiPressable
      style={styles.button}
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: hovered || pressed ? 0.8 : 1,
              scale: hovered ? 1.05 : 1,
            };
          },
        []
      )}
    >
      <Text style={styles.buttonText}>{title}</Text>
      {icon && <AntDesign name={icon} size={20} color="black" />}
    </MotiPressable>
  );
}
