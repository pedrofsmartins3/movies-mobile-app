import AntDesign from "@expo/vector-icons/AntDesign";
import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export type AntDesignIconNames = "" | "home" | "search1" | "download" | "user";

type Props = {
  title: string;
  onPress: () => void;
  icon: AntDesignIconNames;
};

export default function NavButton({
  title = "",
  onPress = () => {},
  icon = "home",
}: Props) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "rgba(0,0,0,0)",
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignItems: "center",
      borderColor: "#fff",
      borderWidth: 1,
      width: "auto",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      gap: 6,
      minWidth: 180,
    },
    buttonText: {
      color: "#fff",
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
