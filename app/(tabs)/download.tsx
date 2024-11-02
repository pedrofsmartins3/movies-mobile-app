import Logo from "@/components/logo/Logo";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {};

export default function download({}: Props) {
  const isWEB = Platform.OS === "web";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isWEB && <Logo />}
      </ScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ainda não possui downloads.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
    padding: 10,
  },
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
