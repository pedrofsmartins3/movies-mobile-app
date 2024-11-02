import { Platform, StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    margin: 6,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
});
