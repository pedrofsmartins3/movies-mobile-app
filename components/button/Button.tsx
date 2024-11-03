import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function Button({ title = "", onPress = () => {} }: Props) {
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
    </MotiPressable>
  );
}

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
