import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../button/Button";
import { Platform } from "react-native";
import useDimensions from "@/hook/useDimensions";

type Props = {
  onChangeText: (a: string) => void;
  text: string;
  handleSearch: () => void;
};

function SearchInput({
  onChangeText = () => {},
  text = "",
  handleSearch = () => {},
}: Props) {
  const isWEB = Platform.OS === "web";
  const { dimensions } = useDimensions();
  const isMobile = dimensions.window.width < 480;

  return (
    <View
      style={{
        width: isMobile ? "100%" : isWEB ? 450 : "90%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 6,
        padding: 10,
      }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Pesquise pelo nome"
      />
      <Button title="Pesquisar" onPress={handleSearch} />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
