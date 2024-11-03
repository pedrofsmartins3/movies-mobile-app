import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, usePathname } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

type Props = {
  userScrollActive: number;
};

function Navbar({ userScrollActive = 0 }: Props) {
  const navigation = useNavigation();
  const pathname = usePathname();

  return (
    <View style={styles.nav}>
      {pathname === "/detail" && (
        <AntDesign
          name="leftcircle"
          size={36}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      )}
      <Image
        source={require("../../assets/images/movies_white.png")}
        style={{ width: 80, height: 80 }}
      />
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
});
