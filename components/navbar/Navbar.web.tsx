import { Link, useRouter } from "expo-router";
import React, { Fragment, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { commonStyles } from "@/styles/styles";
import NavButton, { AntDesignIconNames } from "../button/NavButton";
import useDimensions from "@/hook/useDimensions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Sidebar from "./Sidebar";

type Props = {
  userScrollActive: number;
};

function Navbar({ userScrollActive = 0 }: Props) {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const router = useRouter();
  const { dimensions } = useDimensions();
  const isTablet = dimensions?.window?.width < 960;
  const isPC = dimensions?.window?.width > 960;

  const navItems = [
    {
      title: "Pesquisar",
      icon: "search1",
      onPress: () => {
        router.push("/explore");
      },
    },
    {
      title: "Downloads",
      icon: "download",
      onPress: () => {
        router.push("/download");
      },
    },
    {
      title: "A minha coleção",
      icon: "user",
      onPress: () => {
        router.push("/profile");
      },
    },
  ];

  const renderBG = (n: number) => {
    return `rgba(0,0,0,${n / 10})`;
  };

  const items = navItems.map(
    ({ title = "", icon = "", onPress = () => {} }, index) => (
      <Fragment key={index}>
        <NavButton
          title={title}
          icon={icon as AntDesignIconNames}
          onPress={onPress}
        />
      </Fragment>
    )
  );

  const initalPageBtn = (
    <NavButton
      title="Página inicial"
      icon="home"
      onPress={() =>
        router.push({
          pathname: "/",
        })
      }
    />
  );

  return (
    <View
      style={[
        styles.nav,
        {
          backgroundColor: renderBG(userScrollActive / 10),
        },
      ]}
    >
      <View style={[commonStyles.flexRow, { gap: 20 }]}>
        <Link href={"/"}>
          <Image
            source={require("../../assets/images/movies_white.png")}
            style={{ width: 80, height: 80 }}
          />
        </Link>
        {isPC && initalPageBtn}
      </View>
      {isTablet ? (
        <Sidebar initalPageBtn={initalPageBtn} items={items} />
      ) : (
        <View style={styles.itemsContainer}>{items}</View>
      )}
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 36,
    paddingRight: 36,
    height: 70,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
