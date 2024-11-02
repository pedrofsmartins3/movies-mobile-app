import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../button/Button";
import { Platform } from "react-native";

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

  return (
    <View
      style={{
        width: isWEB ? 450 : "100%",
        display: "flex",
        flexDirection: "row",
        gap: 4,
        padding: 10,
      }}
    >
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Pesquise pelo nome"
      />
      <Button
        title="Pesquisar"
        variant="small"
        color="white"
        onPress={handleSearch}
      />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    color: "#fff",
    flex: 1,
    fontSize: 16,
    height: 50,
  },
});
