import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "../logo/Logo";

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
      <Logo size="" />
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
