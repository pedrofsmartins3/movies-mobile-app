import AntDesign from "@expo/vector-icons/AntDesign";
import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { Platform } from "react-native";
import { StyleSheet, Text } from "react-native";

export type AntDesignIconNames = "" | "home" | "search1" | "download" | "user";

type Props = {
  title: string;
  onPress: () => void;
  icon: AntDesignIconNames;
  variant: string;
};

export default function Button({
  title = "",
  onPress = () => {},
  variant = "",
  icon = "",
}: Props) {
  const nav = variant === "nav";
  const isWEB = Platform.OS === "web";

  const styles = StyleSheet.create({
    button: {
      backgroundColor: nav ? "rgba(0,0,0,0)" : "rgba(255,255,255,1)",
      paddingVertical: nav ? 6 : isWEB ? 10 : 16,
      paddingHorizontal: nav ? 6 : 24,
      borderRadius: 8,
      alignItems: "center",
      borderColor: "#4e4c49",
      borderWidth: 1,
      width: "auto",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      gap: 6,
      minWidth: nav ? 180 : 0,
    },
    buttonText: {
      color: nav ? "#fff" : "#000",
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
      {icon && <AntDesign name={icon} size={16} color="white" />}
      <Text style={styles.buttonText}>{title}</Text>
    </MotiPressable>
  );
}
