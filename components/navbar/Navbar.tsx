import { Href, Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { commonStyles } from "@/styles/styles";

function Navbar() {
  const navItems = [
    {
      title: "Pesquisar",
      url: "/explore",
      icon: <AntDesign name="search1" size={16} color="white" />,
    },
    {
      title: "Downloads",
      url: "/download",
      icon: <Feather name="download" size={16} color="white" />,
    },
    {
      title: "A minha coleção",
      url: "/profile",
      icon: <AntDesign name="user" size={16} color="white" />,
    },
  ];

  return (
    <View style={styles.nav}>
      <View style={[commonStyles.flexRow, { gap: 20 }]}>
        <Link href={"/"}>
          <Image
            source={require("../../assets/images/logo_white.svg")}
            style={{ width: 80, height: 80 }}
          />
        </Link>
        <Link style={styles.label} href="/">
          <AntDesign name="home" size={16} color="white" />
          Página inicial
        </Link>
      </View>
      <View style={styles.icons}>
        {navItems.map(({ title, url = "", icon }, index) => (
          <Link
            style={styles.label}
            key={index}
            href={url as Href<string | object>}
          >
            {title}
            {icon}
          </Link>
        ))}
      </View>
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: "#000",
    height: 60,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    height: 32,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
